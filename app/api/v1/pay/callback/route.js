import iyzipay from 'iyzipay';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const iyzico = new iyzipay({
    apiKey: process.env.IYZIPAY_API_KEY,
    secretKey: process.env.IYZIPAY_SECRET_KEY,
    uri: process.env.IYZIPAY_URI
});

const retrievePayment = (token) => {
    return new Promise((resolve, reject) => {
        iyzico.checkoutForm.retrieve({
            locale: iyzipay.LOCALE.TR,
            conversationId: '123456789',
            token: token
        }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

export async function POST(req) {
    try {
        const formData = await req.formData();
        const token = formData.get('token');

        if (!token) {
            console.error('Callback: Token missing');
            return NextResponse.redirect(new URL('/pricing?payment_status=failure&reason=no_token', req.url), { status: 303 });
        }

        const result = await retrievePayment(token);

        console.log('--- IYZICO CALLBACK START ---');
        console.log('Result Status:', result.status);
        console.log('Payment Status:', result.paymentStatus);
        console.log('Conversation ID:', result.conversationId);
        console.log('Payment ID:', result.paymentId);

        if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {

            if (token) {
                console.log(`Searching for Order with TOKEN: ${token}`);

                try {
                    const existingOrder = await prisma.order.findUnique({
                        where: { token: token }
                    });

                    if (existingOrder) {
                        console.log(`Order Found: ${existingOrder.id}. Updating status...`);

                        // Update Order Status
                        await prisma.order.update({
                            where: { id: existingOrder.id },
                            data: {
                                status: 'PAID',
                                paymentId: result.paymentId
                            }
                        });

                        const tier = await prisma.tier.findUnique({
                            where: { id: existingOrder.tierId }
                        });

                        if (tier) {
                            // Find existing active subscription for the user
                            const existingSub = await prisma.subscription.findFirst({
                                where: {
                                    userId: existingOrder.userId,
                                    status: 'ACTIVE'
                                    // Removed categoryId check
                                }
                            });

                            const now = new Date();

                            // Determine Period
                            let subPeriod = 'Monthly';
                            let daysToAdd = 30;

                            if (existingOrder.price === tier.priceYearly) {
                                subPeriod = 'Yearly';
                                daysToAdd = 365;
                            } else if (tier.priceLifetime && existingOrder.price === tier.priceLifetime) {
                                subPeriod = 'Lifetime';
                                daysToAdd = 36500; // 100 years
                            }

                            let newEndDate = null;
                            if (subPeriod !== 'Lifetime') {
                                newEndDate = new Date();
                                newEndDate.setDate(newEndDate.getDate() + daysToAdd);
                            } else {
                                // For Lifetime, we can set it to null or far future. 
                                // Prisma schema previously had endDate as DateTime? (nullable).
                                // If nullable, null means forever? Or we use a long date.
                                // Let's check schema: endDate DateTime?
                                // Let's use null for true meaningful "no end date" or a far future date if logic requires active checks.
                                // The check 'endDate: { gt: new Date() }' implies we need a date.
                                // So let's use 100 years.
                                newEndDate = new Date();
                                newEndDate.setFullYear(newEndDate.getFullYear() + 100);
                            }

                            if (existingSub) {
                                // UPGRADE/REPLACE: Update existing subscription
                                console.log(`Upgrading existing subscription ${existingSub.id} for user ${existingOrder.userId}`);
                                await prisma.subscription.update({
                                    where: { id: existingSub.id },
                                    data: {
                                        tierId: tier.id,
                                        // Removed categoryId
                                        themeId: existingOrder.themeId,
                                        siteUrl: existingOrder.siteUrl, // Update URL
                                        status: 'ACTIVE',
                                        period: subPeriod,
                                        endDate: newEndDate,
                                        updatedAt: now
                                    }
                                });
                            } else {
                                // NEW: Create new subscription
                                console.log(`Creating NEW subscription for user ${existingOrder.userId}`);
                                await prisma.subscription.create({
                                    data: {
                                        userId: existingOrder.userId,
                                        tierId: tier.id,
                                        // Removed categoryId
                                        themeId: existingOrder.themeId,
                                        siteUrl: existingOrder.siteUrl, // Set URL
                                        status: 'ACTIVE',
                                        period: subPeriod,
                                        endDate: newEndDate,
                                        startDate: now
                                    }
                                });
                            }
                        } else {
                            console.error('Tier not found for order:', existingOrder.id);
                        }

                    } else {
                        console.error('CRITICAL: Order NOT FOUND for token:', token);
                    }
                } catch (dbError) {
                    console.error('DATABASE ERROR:', dbError);
                }
            } else {
                console.error('CRITICAL: Token is missing (logic error)');
            }

            console.log('--- IYZICO CALLBACK END ---');
            return NextResponse.redirect(new URL('/pricing?payment_status=success', req.url), { status: 303 });
        } else {
            const errorMsg = result.errorMessage || 'Unknown Error';
            console.error('Iyzico Failed:', errorMsg);
            return NextResponse.redirect(new URL(`/pricing?payment_status=failure&reason=${encodeURIComponent(errorMsg)}`, req.url), { status: 303 });
        }
    } catch (error) {
        console.error('Callback System Error:', error);
        return NextResponse.redirect(new URL('/pricing?payment_status=failure&reason=server_error', req.url), { status: 303 });
    }
}