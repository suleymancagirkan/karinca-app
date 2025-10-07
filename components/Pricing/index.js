'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TbCheck, TbX, TbStar, TbRocket, TbCrown } from 'react-icons/tb';

const pricingPlans = [
    {
        name: 'Starter',
        price: '$9',
        period: '/month',
        description: 'Perfect for individuals and small projects',
        icon: <TbRocket className="text-2xl" />,
        color: 'border-neutral-200 dark:border-neutral-800',
        bgColor: 'bg-white dark:bg-neutral-900',
        popular: false,
        features: [
            'Up to 5 projects',
            '10GB storage',
            'Basic analytics',
            'Email support',
            'Standard templates',
            'Mobile responsive'
        ],
        limitations: [
            'No custom domain',
            'Limited integrations'
        ],
        cta: 'Start Free Trial',
        ctaStyle: 'bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-100'
    },
    {
        name: 'Professional',
        price: '$29',
        period: '/month',
        description: 'Ideal for growing businesses and teams',
        icon: <TbStar className="text-2xl" />,
        color: 'border-blue-500 dark:border-blue-400',
        bgColor: 'bg-blue-50 dark:bg-blue-950/20',
        popular: true,
        features: [
            'Unlimited projects',
            '100GB storage',
            'Advanced analytics',
            'Priority support',
            'Custom templates',
            'API access',
            'Team collaboration',
            'Custom domain'
        ],
        limitations: [],
        cta: 'Start Free Trial',
        ctaStyle: 'bg-blue-600 text-white hover:bg-blue-700'
    },
    {
        name: 'Enterprise',
        price: '$99',
        period: '/month',
        description: 'For large organizations with advanced needs',
        icon: <TbCrown className="text-2xl" />,
        color: 'border-neutral-200 dark:border-neutral-800',
        bgColor: 'bg-white dark:bg-neutral-900',
        popular: false,
        features: [
            'Everything in Professional',
            'Unlimited storage',
            'White-label solution',
            'Dedicated support',
            'Custom integrations',
            'Advanced security',
            'SLA guarantee',
            'On-premise deployment'
        ],
        limitations: [],
        cta: 'Contact Sales',
        ctaStyle: 'bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-100'
    }
];

export default function Pricing() {
    const [billingPeriod, setBillingPeriod] = useState('monthly');

    const toggleBilling = () => {
        setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly');
    };

    const getPrice = (basePrice) => {
        if (billingPeriod === 'yearly') {
            return Math.round(basePrice * 10); // 2 months free
        }
        return basePrice;
    };

    const getPeriod = () => {
        return billingPeriod === 'yearly' ? '/year' : '/month';
    };

    return (
        <div className="flex flex-col items-center justify-center gap-y-8 xl:px-40 xl:py-20 p-8 mt-20">
            {/* Header */}
            <div className="flex flex-col items-center justify-center gap-y-4 text-center">
                <span className="font-black text-black dark:text-white text-6xl tracking-tight">
                    Simple, transparent pricing
                </span>
                <span className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl">
                    Choose the perfect plan for your needs. Start free, upgrade anytime.
                </span>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center gap-x-4 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        billingPeriod === 'monthly'
                            ? 'bg-white dark:bg-neutral-700 text-black dark:text-white shadow-sm'
                            : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                >
                    Monthly
                </button>
                <button
                    onClick={() => setBillingPeriod('yearly')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        billingPeriod === 'yearly'
                            ? 'bg-white dark:bg-neutral-700 text-black dark:text-white shadow-sm'
                            : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                >
                    Yearly
                    <span className="ml-2 px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                        Save 20%
                    </span>
                </button>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {pricingPlans.map((plan, index) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative flex flex-col p-8 rounded-2xl border-2 ${plan.color} ${plan.bgColor} ${
                            plan.popular ? 'ring-2 ring-blue-500/20' : ''
                        }`}
                    >
                        {/* Popular Badge */}
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                                    Most Popular
                                </span>
                            </div>
                        )}

                        {/* Plan Header */}
                        <div className="flex flex-col items-center gap-y-4 mb-8">
                            <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                                {plan.icon}
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                                    {plan.name}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                    {plan.description}
                                </p>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="text-center mb-8">
                            <div className="flex items-baseline justify-center gap-x-1">
                                <span className="text-5xl font-bold text-black dark:text-white">
                                    ${getPrice(parseInt(plan.price.replace('$', '')))}
                                </span>
                                <span className="text-neutral-600 dark:text-neutral-400">
                                    {getPeriod()}
                                </span>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="flex-1 mb-8">
                            <ul className="space-y-3">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-x-3">
                                        <TbCheck className="text-green-500 text-lg mt-0.5 flex-shrink-0" />
                                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                                {plan.limitations.map((limitation, limitationIndex) => (
                                    <li key={limitationIndex} className="flex items-start gap-x-3">
                                        <TbX className="text-red-500 text-lg mt-0.5 flex-shrink-0" />
                                        <span className="text-neutral-500 dark:text-neutral-500 text-sm line-through">
                                            {limitation}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA Button */}
                        <button className={`w-full py-3 px-6 rounded-xl font-medium transition-colors ${plan.ctaStyle}`}>
                            {plan.cta}
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* FAQ/Additional Info */}
            <div className="text-center mt-8">
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    All plans include 14-day free trial. No credit card required.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2">
                    Need a custom plan? <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Contact our sales team</span>
                </p>
            </div>
        </div>
    );
}

