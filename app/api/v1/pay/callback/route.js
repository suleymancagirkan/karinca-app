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

            // Search by TOKEN instead of conversationId for reliability
            // We use the 'token' from the request (formData)

            if (token) {
                console.log(`Searching for Order with TOKEN: ${token}`);

                try {
                    const existingOrder = await prisma.order.findUnique({
                        where: { token: token }
                    });

                    if (existingOrder) {
                        console.log(`Order Found: ${existingOrder.id}. Updating status...`);

                        const updatedOrder = await prisma.order.update({
                            where: { id: existingOrder.id },
                            data: {
                                status: 'PAID',
                                paymentId: result.paymentId
                            }
                        });
                        console.log('Order Updated:', updatedOrder.id);

                        const tier = await prisma.tier.findUnique({
                            where: { id: updatedOrder.tierId },
                            include: { category: true }
                        });

                        if (tier) {
                            // Check for existing active subscription in same category
                            const existingSub = await prisma.subscription.findFirst({
                                where: {
                                    userId: updatedOrder.userId,
                                    tier: { categoryId: tier.categoryId },
                                    status: 'ACTIVE',
                                    endDate: { gt: new Date() }
                                }
                            });

                            const now = new Date();
                            const subPeriod = updatedOrder.price === tier.priceYearly ? 'Yearly' : 'Monthly'; // Infer period from price match
                            const daysToAdd = subPeriod === 'Yearly' ? 365 : 30;

                            let newEndDate = new Date();
                            newEndDate.setDate(newEndDate.getDate() + daysToAdd);

                            if (existingSub) {
                                // UPGRADE: Update existing subscription
                                console.log(`Upgrading existing subscription ${existingSub.id} for user ${updatedOrder.userId}`);
                                await prisma.subscription.update({
                                    where: { id: existingSub.id },
                                    data: {
                                        tierId: tier.id,
                                        categoryId: tier.categoryId,
                                        themeId: updatedOrder.themeId, // Carry over theme from order
                                        status: 'ACTIVE',
                                        period: subPeriod,
                                        endDate: newEndDate,
                                        updatedAt: now
                                    }
                                });
                            } else {
                                // NEW: Create new subscription
                                console.log(`Creating NEW subscription for user ${updatedOrder.userId}`);
                                await prisma.subscription.create({
                                    data: {
                                        userId: updatedOrder.userId,
                                        tierId: tier.id,
                                        categoryId: tier.categoryId,
                                        themeId: updatedOrder.themeId,
                                        status: 'ACTIVE',
                                        period: subPeriod,
                                        endDate: newEndDate
                                    }
                                });
                            }
                        } else {
                            console.error('Tier not found for order:', updatedOrder.id);
                        }

                    } else {
                        console.error('CRITICAL: Order NOT FOUND for token:', token);
                        // Fallback to conversationId if token match failed? 
                        // But if we saved token, it should work.
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