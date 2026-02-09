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
        const { tier, method, billingAddress, siteUrl } = body; // Price ignored from body for security

        // 1. Fetch Request Tier from DB to get authoritative price
        const targetTier = await prisma.tier.findUnique({
            where: { id: tier.id },
            include: { category: true }
        });

        if (!targetTier) {
            return Response.json({ status: 'failure', errorMessage: 'Plan not found' }, { status: 404 });
        }

        const targetPrice = method === 'Monthly' ? targetTier.priceMonthly : targetTier.priceYearly;
        let finalPrice = targetPrice;

        // Check for URL uniqueness if provided
        if (siteUrl) {
            const existingSubWithUrl = await prisma.subscription.findFirst({
                where: {
                    siteUrl: siteUrl,
                    status: 'ACTIVE'
                }
            });

            if (existingSubWithUrl) {
                return Response.json({ status: 'failure', errorMessage: 'This URL is already in use by another active subscription.' }, { status: 400 });
            }
        }

        // 2. Check for existing Active Subscription in the same Category
        const existingSub = await prisma.subscription.findFirst({
            where: {
                userId: userRecord.id,
                status: 'ACTIVE',
                endDate: { gt: new Date() },
                tier: { categoryId: targetTier.categoryId }
            },
            include: { tier: true }
        });

        if (existingSub) {
            // A. Block re-purchasing same plan
            if (existingSub.tierId === targetTier.id) {
                return Response.json({ status: 'failure', errorMessage: 'You already have this plan active.' }, { status: 400 });
            }

            // B. Block Downgrade (Compare checks base monthly value)
            if (existingSub.tier.priceMonthly >= targetTier.priceMonthly) {
                return Response.json({ status: 'failure', errorMessage: 'Downgrading is not supported on this plan. Please contact support or wait for your current subscription to expire.' }, { status: 400 });
            }

            // C. Upgrade Calculation (Proration)
            const now = new Date();
            const endDate = new Date(existingSub.endDate);
            const msPerDay = 1000 * 60 * 60 * 24;

            // Calculate remaining value
            const remainingTimeMs = endDate.getTime() - now.getTime();
            const remainingDays = Math.max(0, Math.ceil(remainingTimeMs / msPerDay));

            // Determine old daily rate based on what they likely paid (Current DB price as proxy)
            const oldPrice = existingSub.period === 'Monthly' ? existingSub.tier.priceMonthly : existingSub.tier.priceYearly;
            const oldPeriodDays = existingSub.period === 'Monthly' ? 30 : 365;
            const dailyRate = oldPrice / oldPeriodDays;

            const unusedValue = dailyRate * remainingDays;

            // Discount the unused value from the new price
            finalPrice = Math.max(0, targetPrice - unusedValue);

            console.log(`Upgrade Detected: Old Tier ${existingSub.tier.name} -> New Tier ${targetTier.name}. Discount: ${unusedValue.toFixed(2)}, Final: ${finalPrice.toFixed(2)}`);
        }

        const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
        const conversationId = `TRX-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        const paidPrice = parseFloat(finalPrice).toFixed(2);

        // Extract theme info (if available)
        const themeInfo = tier.theme || null;

        // 3. Create Pending Order
        const newOrder = await prisma.order.create({
            data: {
                userId: userRecord.id,
                tierId: targetTier.id,
                tierName: targetTier.name,
                categoryId: targetTier.categoryId,
                categoryName: targetTier.category?.name,
                themeId: themeInfo?.id || null,
                themeName: themeInfo?.name || null,
                price: parseFloat(paidPrice),
                currency: 'TRY',
                status: 'PENDING',
                conversationId: conversationId,
                couponCode: null,
                siteUrl: siteUrl || null
            }
        });

        const fullName = billingAddress?.name || userRecord.fullname || 'Guest User';
        const [name, ...surnameParts] = fullName.split(' ');
        const surname = surnameParts.join(' ') || 'User';

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