import Iyzipay from 'iyzipay';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

const iyzipay = new Iyzipay({
    apiKey: process.env.IYZIPAY_API_KEY,
    secretKey: process.env.IYZIPAY_SECRET_KEY,
    uri: process.env.IYZIPAY_URI
});

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return Response.json({ status: 'failure', errorMessage: 'User session required' }, { status: 401 });
        }

        const userRecord = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!userRecord) {
            return Response.json({ status: 'failure', errorMessage: 'User record not found' }, { status: 404 });
        }

        const body = await req.json();
        const { tier, method, billingAddress, siteUrl } = body;

        // 1. Fetch Request Tier from DB to get authoritative price
        const targetTier = await prisma.tier.findUnique({
            where: { id: tier.id }
        });

        if (!targetTier) {
            return Response.json({ status: 'failure', errorMessage: 'Plan not found' }, { status: 404 });
        }

        let targetPrice;
        if (method === 'Monthly') targetPrice = targetTier.priceMonthly;
        else if (method === 'Yearly') targetPrice = targetTier.priceYearly;
        else if (method === 'Lifetime') targetPrice = targetTier.priceLifetime;
        else targetPrice = targetTier.priceMonthly; // Default

        let finalPrice = targetPrice;

        // Check for URL uniqueness if provided
        if (siteUrl) {
            const existingSubWithUrl = await prisma.subscription.findFirst({
                where: {
                    siteUrl: siteUrl,
                    status: 'ACTIVE'
                }
            });

            if (existingSubWithUrl && existingSubWithUrl.userId !== userRecord.id) {
                return Response.json({ status: 'failure', errorMessage: 'This URL is already in use by another active subscription.' }, { status: 400 });
            }
        }

        // 2. Check for existing Active Subscription (Account Level)
        const existingSub = await prisma.subscription.findFirst({
            where: {
                userId: userRecord.id,
                status: 'ACTIVE',
                // Removed categoryId check
            },
            include: { tier: true }
        });

        // Only apply upgrade/downgrade logic if we are NOT buying a distinct Lifetime deal or if logic allows replacing.
        // For simplicity, if user has an active sub, we treat this as a potential upgrade/switch.

        if (existingSub) {
            // If buying Lifetime, we generally just upgrade them and cancel old subscription logic effectively by replacing it.
            // But let's keep it simple: If upgrading checks:

            // If same tier and same period, block
            if (existingSub.tierId === targetTier.id && existingSub.period === method) {
                return Response.json({ status: 'failure', errorMessage: 'You already have this plan active.' }, { status: 400 });
            }

            // If Lifetime is involved, special handling might be needed, but sticking to value-based logic:

            // B. Block Downgrade (Compare checks base monthly value)
            // We use monthly price as a proxy for tier value
            if (existingSub.tier.priceMonthly > targetTier.priceMonthly) {
                return Response.json({ status: 'failure', errorMessage: 'Downgrading is not supported automatically. Please wait for current subscription to expire.' }, { status: 400 });
            }

            // C. Upgrade Calculation (Proration)
            // Only prorate if existing sub is NOT Lifetime (Lifetime has no end date usually, or far future)
            if (existingSub.period !== 'Lifetime') {
                const now = new Date();
                const endDate = existingSub.endDate ? new Date(existingSub.endDate) : new Date();
                const msPerDay = 1000 * 60 * 60 * 24;

                // Calculate remaining value
                const remainingTimeMs = endDate.getTime() - now.getTime();
                const remainingDays = Math.max(0, Math.ceil(remainingTimeMs / msPerDay));

                // Determine old daily rate
                const oldPrice = existingSub.period === 'Monthly' ? existingSub.tier.priceMonthly : existingSub.tier.priceYearly;
                const oldPeriodDays = existingSub.period === 'Monthly' ? 30 : 365;
                const dailyRate = oldPrice / oldPeriodDays;

                const unusedValue = dailyRate * remainingDays;

                // Discount the unused value from the new price
                finalPrice = Math.max(0, targetPrice - unusedValue);

                console.log(`Upgrade Detected: Old Tier ${existingSub.tier.name} -> New Tier ${targetTier.name}. Discount: ${unusedValue.toFixed(2)}, Final: ${finalPrice.toFixed(2)}`);
            }
        }

        const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
        const conversationId = `TRX-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        const paidPrice = parseFloat(finalPrice).toFixed(2);

        // 3. Create Pending Order
        const newOrder = await prisma.order.create({
            data: {
                userId: userRecord.id,
                tierId: targetTier.id,
                tierName: targetTier.name,
                // Removed categoryId and categoryName
                price: parseFloat(paidPrice),
                currency: 'TRY',
                status: 'PENDING',
                conversationId: conversationId,
                couponCode: null,
                siteUrl: siteUrl || null
            }
        });

        const fullName = billingAddress?.name || userRecord.fullname || 'Guest User';
        const nameParts = fullName.trim().split(' ');
        const name = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : nameParts[0];
        const surname = nameParts.length > 1 ? nameParts[nameParts.length - 1] : 'User';

        const requestData = {
            locale: Iyzipay.LOCALE.TR,
            conversationId: conversationId,
            price: paidPrice,
            paidPrice: paidPrice,
            currency: Iyzipay.CURRENCY.TRY,
            basketId: targetTier.id,
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/pay/callback`,
            buyer: {
                id: userRecord.id,
                name: name || 'Davut',
                surname: surname || 'Simsek',
                gsmNumber: '+905555555555',
                email: userRecord.email,
                identityNumber: '11111111111',
                lastLoginDate: '2024-01-01 12:00:00',
                registrationDate: '2024-01-01 12:00:00',
                registrationAddress: billingAddress?.address || 'N/A',
                ip: ip,
                city: billingAddress?.city || 'Istanbul',
                country: billingAddress?.country || 'Turkey',
                zipCode: billingAddress?.postalCode || '34732'
            },
            shippingAddress: {
                contactName: fullName,
                city: billingAddress?.city || 'Istanbul',
                country: billingAddress?.country || 'Turkey',
                address: billingAddress?.address || 'N/A',
                zipCode: billingAddress?.postalCode || '34732'
            },
            billingAddress: {
                contactName: fullName,
                city: billingAddress?.city || 'Istanbul',
                country: billingAddress?.country || 'Turkey',
                address: billingAddress?.address || 'N/A',
                zipCode: billingAddress?.postalCode || '34732'
            },
            basketItems: [
                {
                    id: targetTier.id,
                    name: targetTier.name,
                    category1: 'Subscription',
                    itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                    price: paidPrice
                }
            ]
        };

        return new Promise((resolve) => {
            iyzipay.checkoutFormInitialize.create(requestData, async (err, result) => {
                if (err) {
                    console.error('Iyzico Init Error:', err);
                    resolve(Response.json({ status: 'failure', errorMessage: err.errorMessage || err.message || 'Iyzico initialization failed' }, { status: 500 }));
                } else {
                    if (result.status === 'success' && result.token) {
                        try {
                            await prisma.order.update({
                                where: { id: newOrder.id },
                                data: { token: result.token }
                            });
                        } catch (updateErr) {
                            console.error('Failed to save token to order:', updateErr);
                        }
                    }
                    resolve(Response.json(result));
                }
            });
        });
    } catch (error) {
        console.error('Payment Init Error:', error);
        return Response.json({ status: 'failure', errorMessage: error.message }, { status: 500 });
    }
}