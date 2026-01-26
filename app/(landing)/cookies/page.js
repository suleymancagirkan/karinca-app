import React from 'react';

export default function Cookies() {
    return (
        <div className="xl:px-40 xl:py-20 p-8 mt-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-black text-black dark:text-white tracking-tight mb-6">
                        Cookie Policy
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                        Last updated: December 2024
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">What Are Cookies</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">How We Use Cookies</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            Karınca uses cookies to enhance your experience on our website. We use cookies for various purposes including:
                        </p>
                        <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 mb-6 space-y-2">
                            <li>Remembering your preferences and settings</li>
                            <li>Analyzing how you use our website</li>
                            <li>Providing personalized content and advertisements</li>
                            <li>Improving our website's functionality and performance</li>
                            <li>Ensuring security and preventing fraud</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Types of Cookies We Use</h2>
                        
                        <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Essential Cookies</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                            These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and remembering your login status.
                        </p>

                        <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Analytics Cookies</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance and user experience.
                        </p>

                        <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Functional Cookies</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                            These cookies enable the website to provide enhanced functionality and personalization, such as remembering your language preference or region.
                        </p>

                        <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Marketing Cookies</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            These cookies are used to track visitors across websites to display relevant and engaging advertisements.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Managing Cookies</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            You can control and manage cookies in various ways. Most web browsers allow you to refuse cookies or delete them. However, please note that if you choose to disable cookies, some features of our website may not function properly.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Third-Party Cookies</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            Some cookies on our website are set by third-party services. These may include analytics providers, advertising networks, and social media platforms. We do not control these cookies, and you should refer to the respective third-party privacy policies for more information.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Updates to This Policy</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
                        </p>

                        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                            <p className="text-sm text-neutral-500 dark:text-neutral-500">
                                If you have any questions about our use of cookies, please contact us at privacy@karinca.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
