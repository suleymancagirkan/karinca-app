import React from 'react';

export default function Privacy() {
    return (
        <div className="xl:px-40 xl:py-20 p-8 mt-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-black text-black dark:text-white tracking-tight mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                        Last updated: December 2024
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Information We Collect</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, phone number, and payment information.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">How We Use Your Information</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 mb-6 space-y-2">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process transactions and send related information</li>
                            <li>Send technical notices, updates, and support messages</li>
                            <li>Respond to your comments and questions</li>
                            <li>Monitor and analyze trends and usage</li>
                            <li>Personalize and improve your experience</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Information Sharing</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 mb-6 space-y-2">
                            <li>With your consent</li>
                            <li>To comply with legal obligations</li>
                            <li>To protect our rights and prevent fraud</li>
                            <li>With service providers who assist us in operating our platform</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Data Security</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Data Retention</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Your Rights</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 mb-6 space-y-2">
                            <li>Access and update your personal information</li>
                            <li>Request deletion of your personal information</li>
                            <li>Object to processing of your personal information</li>
                            <li>Request data portability</li>
                            <li>Withdraw consent at any time</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Third-Party Services</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            Our services may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any personal information.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Children's Privacy</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Changes to This Policy</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                        </p>

                        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                            <p className="text-sm text-neutral-500 dark:text-neutral-500">
                                If you have any questions about this Privacy Policy, please contact us at privacy@karinca.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
