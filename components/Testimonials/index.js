'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TbStar, TbQuote } from 'react-icons/tb';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'CEO, TechStart',
        company: 'TechStart Inc.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        content: 'Karınca transformed our development process. We went from idea to MVP in just 2 weeks. The platform is incredibly intuitive and the support team is outstanding.',
        rating: 5,
        featured: true
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Product Manager',
        company: 'InnovateLab',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        content: 'The analytics and insights we get from Karınca help us make data-driven decisions. Our user engagement increased by 40% after implementing their recommendations.',
        rating: 5,
        featured: false
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'Founder',
        company: 'StartupXYZ',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        content: 'As a non-technical founder, Karınca made it possible for me to build and launch my SaaS without coding. The templates and integrations are game-changers.',
        rating: 5,
        featured: false
    },
    {
        id: 4,
        name: 'David Kim',
        role: 'CTO',
        company: 'ScaleUp',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        content: 'The infrastructure reliability is impressive. We have 99.9% uptime and the performance is consistently fast. Karınca handles all the complexity so we can focus on our product.',
        rating: 5,
        featured: true
    },
    {
        id: 5,
        name: 'Lisa Thompson',
        role: 'Marketing Director',
        company: 'GrowthCo',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        content: 'The marketing automation features saved us hours of manual work. Our conversion rates improved significantly and the ROI was immediate.',
        rating: 5,
        featured: false
    },
    {
        id: 6,
        name: 'Alex Martinez',
        role: 'Developer',
        company: 'DevStudio',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        content: 'The API is well-documented and the SDKs are robust. Integration was seamless and the developer experience is top-notch. Highly recommended for any development team.',
        rating: 5,
        featured: false
    }
];

export default function Testimonials() {
    const featuredTestimonials = testimonials.filter(t => t.featured);
    const regularTestimonials = testimonials.filter(t => !t.featured);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <TbStar 
                key={i} 
                className={`text-lg ${i < rating ? 'text-yellow-400 fill-current' : 'text-neutral-300 dark:text-neutral-600'}`} 
            />
        ));
    };

    return (
        <div className="xl:px-40 xl:py-20 p-8 mt-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-6xl font-black text-black dark:text-white tracking-tight">
                        Loved by developers
                    </span>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg mt-6 max-w-2xl mx-auto">
                        Join thousands of teams who trust Karınca to power their SaaS applications
                    </p>
                </div>

                {/* Featured Testimonials */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {featuredTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative p-8 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-6 text-blue-500/20">
                                <TbQuote className="text-4xl" />
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-x-1 mb-4">
                                {renderStars(testimonial.rating)}
                            </div>

                            {/* Content */}
                            <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed mb-6">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-x-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold text-black dark:text-white">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        {testimonial.role} at {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Regular Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {regularTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
                            className="p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow"
                        >
                            {/* Rating */}
                            <div className="flex items-center gap-x-1 mb-4">
                                {renderStars(testimonial.rating)}
                            </div>

                            {/* Content */}
                            <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-4">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-x-3">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-medium text-black dark:text-white text-sm">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl md:text-4xl font-black text-black dark:text-white mb-2">
                                10K+
                            </div>
                            <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                                Active Users
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-black text-black dark:text-white mb-2">
                                99.9%
                            </div>
                            <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                                Uptime
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-black text-black dark:text-white mb-2">
                                50+
                            </div>
                            <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                                Countries
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-black text-black dark:text-white mb-2">
                                24/7
                            </div>
                            <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                                Support
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
