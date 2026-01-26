// PurchaseModal.jsx
'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbCheck, TbX } from 'react-icons/tb';

export default function PurchaseModal({ selectedSubs, setSelectedSubs, billingAddress, setBillingAddress, method, type = 'Plan' }) {
    const [showBillingModal, setShowBillingModal] = useState(false);
    const [billingData, setBillingData] = useState({ name: '', address: '', city: '', country: '', postalCode: '' });
    const [discountCode, setDiscountCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(0);
    const [discountError, setDiscountError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleApplyDiscount = () => {
        if (discountCode.toLowerCase() === 'zolio10') {
            setAppliedDiscount(10);
            setDiscountError('');
        } else if (discountCode.toLowerCase() === 'zolio50') {
            setAppliedDiscount(50);
            setDiscountError('');
        } else {
            setAppliedDiscount(0);
            setDiscountError('Invalid discount code.');
        }
    };

    return (
        <>
            <AnimatePresence>
                {selectedSubs && !showSuccess && (
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
                                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
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

                                <div className="flex flex-col gap-y-3">
                                    <label className="text-sm font-medium text-black">Cardholder Name</label>
                                    <input type="text" placeholder="John Doe" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />

                                    <label className="text-sm font-medium text-black">Card Details</label>
                                    <input type="text" placeholder="1234 5678 9012 3456" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />

                                    <div className="flex gap-x-3">
                                        <div className="flex-1">
                                            <label className="text-sm font-medium text-black">Expiry Date</label>
                                            <input type="text" placeholder="MM/YY" className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-sm font-medium text-black">CVC</label>
                                            <input type="text" placeholder="123" className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black" />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedSubs(null);
                                        setShowSuccess(true);
                                    }}
                                    className="bg-black text-white py-3 rounded-lg hover:bg-black/85 transition-colors mt-3"
                                >
                                    Pay ₺{selectedSubs?.prices.find((i) => i.id === method)?.amount} / {method}
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
                                                <input type="text" className="border px-3 py-2 rounded-lg" placeholder="John Doe" onChange={(e) => setBillingData({ ...billingData, name: e.target.value })} />

                                                <label className="text-sm font-medium text-black">Address</label>
                                                <input type="text" className="border px-3 py-2 rounded-lg" placeholder="123 Main St" onChange={(e) => setBillingData({ ...billingData, address: e.target.value })} />

                                                <label className="text-sm font-medium text-black">City</label>
                                                <input type="text" className="border px-3 py-2 rounded-lg" placeholder="New York" onChange={(e) => setBillingData({ ...billingData, city: e.target.value })} />

                                                <label className="text-sm font-medium text-black">Country</label>
                                                <input type="text" className="border px-3 py-2 rounded-lg" placeholder="USA" onChange={(e) => setBillingData({ ...billingData, country: e.target.value })} />

                                                <label className="text-sm font-medium text-black">Postal Code</label>
                                                <input type="text" className="border px-3 py-2 rounded-lg" placeholder="10001" onChange={(e) => setBillingData({ ...billingData, postalCode: e.target.value })} />
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

            <AnimatePresence>
                {showSuccess && (
                    <>
                        <motion.div
                            className="fixed inset-0 backdrop-blur-md bg-black/10 z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSuccess(false)}
                        />

                        <motion.div
                            className="fixed top-1/2 left-1/2 bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-y-4 z-60 -translate-x-1/2 -translate-y-1/2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl">
                                ✓
                            </div>
                            <span className="text-xl font-semibold text-black">Payment Successful!</span>
                            <span className="text-sm text-black/60 text-center">
                                Thank you for your purchase. You can now access your new features.
                            </span>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-black/85 transition-colors mt-2"
                            >
                                Close
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}