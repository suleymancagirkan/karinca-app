// PurchaseModal.jsx
'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbCheck, TbX, TbLoader } from 'react-icons/tb';

export default function PurchaseModal({ selectedSubs, setSelectedSubs, billingAddress, setBillingAddress, method, type = 'Plan' }) {
    const [showBillingModal, setShowBillingModal] = useState(false);
    const [billingData, setBillingData] = useState({ name: '', address: '', city: '', country: '', postalCode: '' });
    const [discountCode, setDiscountCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(0);
    const [discountError, setDiscountError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkoutHtml, setCheckoutHtml] = useState(null);

    const handleApplyDiscount = async () => {
        setDiscountError('');
        try {
            const res = await fetch('/api/v1/validate-coupon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: discountCode })
            });

            if (!res.ok) {
                const errorText = await res.text();
                setDiscountError(errorText || 'Invalid discount code');
                setAppliedDiscount(0);
                return;
            }

            const coupon = await res.json();

            const currentPrice = selectedSubs?.prices.find((i) => i.id === method)?.amount || 0;
            let discountAmount = 0;

            if (coupon.discountType === 'percent') {
                discountAmount = (currentPrice * coupon.discount) / 100;
            } else {
                discountAmount = coupon.discount;
            }

            // Ensure discount doesn't exceed price
            discountAmount = Math.min(discountAmount, currentPrice);

            setAppliedDiscount(discountAmount);
            setDiscountError('');
        } catch (error) {
            console.error('Discount error:', error);
            setDiscountError('Failed to apply discount');
        }
    };

    const handlePayment = async () => {
        if (!billingAddress) {
            alert('Please add a billing address');
            return;
        }

        setLoading(true);
        try {
            const finalPrice = Math.max(0, selectedSubs?.prices.find((i) => i.id === method)?.amount - appliedDiscount);

            const res = await fetch('/api/v1/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tier: selectedSubs,
                    method,
                    price: finalPrice,
                    billingAddress,
                    user: {
                        // In a real app, pass logged-in user info here if not available in billingAddress
                    }
                })
            });

            if (!res.ok) {
                throw new Error('Payment initialization failed');
            }

            const result = await res.json();

            if (result.status === 'success' && result.checkoutFormContent) {
                setCheckoutHtml(result.checkoutFormContent);
            } else {
                alert('Payment verification failed: ' + (result.errorMessage || 'Unknown error'));
            }
        } catch (error) {
            console.error('Payment Error:', error);
            alert('An error occurred during payment initialization');
        } finally {
            setLoading(false);
        }
    };

    // Effect to execute scripts in checkoutHtml
    React.useEffect(() => {
        if (checkoutHtml) {
            // Need to wait for DOM update to have the container
            const timer = setTimeout(() => {
                const container = document.getElementById('iyzico-checkout-container');
                if (container) {
                    container.innerHTML = checkoutHtml;
                    const scripts = container.getElementsByTagName('script');
                    for (let i = 0; i < scripts.length; i++) {
                        const script = document.createElement('script');
                        script.text = scripts[i].text;
                        document.body.appendChild(script);
                    }
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [checkoutHtml]);

    return (
        <>
            <AnimatePresence>
                {selectedSubs && !showSuccess && !checkoutHtml && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSubs(null)}
                        />

                        <motion.div
                            className="fixed top-1/2 left-1/2 max-w-lg w-full p-6 bg-white rounded-2xl shadow-xl z-50 -translate-x-1/2 -translate-y-1/2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex flex-col gap-y-5">
                                <span className="text-2xl font-semibold text-black">
                                    {selectedSubs?.title} {type} Checkout
                                </span>

                                <div className="bg-neutral-100 rounded-lg p-4 flex flex-col gap-y-2">
                                    <div className="flex justify-between text-black font-medium">
                                        <span>Selected Plan:</span>
                                        <span>{method} — ₺{selectedSubs?.prices.find((i) => i.id === method)?.amount}</span>
                                    </div>
                                    <div className="flex justify-between text-black">
                                        <span>Discount:</span>
                                        <span>- ₺{appliedDiscount}</span>
                                    </div>
                                    <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold text-black">
                                        <span>Total to Pay:</span>
                                        <span>₺{Math.max(0, selectedSubs?.prices.find((i) => i.id === method)?.amount - appliedDiscount)}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-y-2">
                                    <span className="text-sm font-medium text-black">Billing Address</span>
                                    {billingAddress ? (
                                        <div className="bg-neutral-100 rounded-lg p-2 text-sm text-black">
                                            <p>{billingAddress.name}</p>
                                            <p>{billingAddress.address}</p>
                                            <p>{billingAddress.city}, {billingAddress.country} {billingAddress.postalCode}</p>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setShowBillingModal(true)}
                                            className="text-black/60 hover:text-black transition-colors text-sm underline text-left"
                                        >
                                            Add Billing Address
                                        </button>
                                    )}
                                </div>

                                <div className="flex flex-col gap-y-2">
                                    <span className="text-sm font-medium text-black">Discount Code</span>
                                    <div className="flex gap-x-2">
                                        <input
                                            type="text"
                                            value={discountCode}
                                            onChange={(e) => setDiscountCode(e.target.value)}
                                            placeholder="Enter discount code"
                                            className="flex-1 border text-black border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                        <button
                                            onClick={handleApplyDiscount}
                                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black/85 transition-colors"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {discountError && <span className="text-red-500 text-xs">{discountError}</span>}
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border border-blue-200">
                                    <p>You will be redirected to the secure payment page to complete your purchase using Iyzico.</p>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={loading || !billingAddress}
                                    className="bg-black text-white py-3 rounded-lg hover:bg-black/85 transition-colors mt-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? <TbLoader className="animate-spin" /> : null}
                                    Pay ₺{Math.max(0, selectedSubs?.prices.find((i) => i.id === method)?.amount - appliedDiscount)} / {method}
                                </button>

                                <button
                                    onClick={() => setSelectedSubs(null)}
                                    className="text-black/60 hover:text-black transition-colors text-sm text-center"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>

                        {/* Billing Modal */}
                        <AnimatePresence>
                            {showBillingModal && (
                                <>
                                    <motion.div
                                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-60"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setShowBillingModal(false)}
                                    />

                                    <motion.div
                                        className="fixed top-1/2 left-1/2 max-w-md w-full p-5 bg-white rounded-2xl shadow-xl z-70 -translate-x-1/2 -translate-y-1/2"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex flex-col gap-y-4">
                                            <div>
                                                <span className="text-2xl font-bold text-black block">Billing Address</span>
                                                <span className="text-sm text-black/60">Please enter your billing details below.</span>
                                            </div>

                                            <div className="flex flex-col gap-y-2">
                                                <label className="text-sm font-medium text-black">Full Name</label>
                                                <input type="text" className="border text-black px-3 py-2 rounded-lg" placeholder="John Doe" onChange={(e) => setBillingData({ ...billingData, name: e.target.value })} />

                                                <label className="text-sm font-medium text-black">Address</label>
                                                <input type="text" className="border text-black px-3 py-2 rounded-lg" placeholder="123 Main St" onChange={(e) => setBillingData({ ...billingData, address: e.target.value })} />

                                                <label className="text-sm font-medium text-black">City</label>
                                                <input type="text" className="border text-black px-3 py-2 rounded-lg" placeholder="New York" onChange={(e) => setBillingData({ ...billingData, city: e.target.value })} />

                                                <label className="text-sm font-medium text-black">Country</label>
                                                <input type="text" className="border text-black px-3 py-2 rounded-lg" placeholder="USA" onChange={(e) => setBillingData({ ...billingData, country: e.target.value })} />

                                                <label className="text-sm font-medium text-black">Postal Code</label>
                                                <input type="text" className="border text-black px-3 py-2 rounded-lg" placeholder="10001" onChange={(e) => setBillingData({ ...billingData, postalCode: e.target.value })} />
                                            </div>

                                            <button
                                                onClick={() => {
                                                    setBillingAddress(billingData);
                                                    setShowBillingModal(false);
                                                }}
                                                className="bg-black text-white py-2 rounded-lg hover:bg-black/85 transition-colors w-full"
                                            >
                                                Save Address
                                            </button>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </AnimatePresence>

            {/* Iyzico Form Container */}
            {checkoutHtml && (
                <div id="iyzico-checkout-container" className="fixed inset-0 z-[100] bg-white"></div>
            )}
        </>
    );
}