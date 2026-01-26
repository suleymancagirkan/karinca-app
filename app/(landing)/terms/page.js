import React from 'react';

export default function Terms() {
    return (
        <div className="xl:px-40 xl:py-20 p-8 mt-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-black text-black dark:text-white tracking-tight mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                        Last updated: December 2024
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            By accessing and using Karınca, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">2. Use License</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            Permission is granted to temporarily download one copy of Karınca per device for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 mb-6 space-y-2">
                            <li>modify or copy the materials</li>
                            <li>use the materials for any commercial purpose or for any public display</li>
                            <li>attempt to reverse engineer any software contained on the website</li>
                            <li>remove any copyright or other proprietary notations from the materials</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">3. Disclaimer</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            The materials on Karınca are provided on an 'as is' basis. Karınca makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">4. Limitations</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            In no event shall Karınca or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Karınca, even if Karınca or a Karınca authorized representative has been notified orally or in writing of the possibility of such damage.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">5. Accuracy of Materials</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            The materials appearing on Karınca could include technical, typographical, or photographic errors. Karınca does not warrant that any of the materials on its website are accurate, complete or current. Karınca may make changes to the materials contained on its website at any time without notice.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">6. Links</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            Karınca has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Karınca of the site. Use of any such linked website is at the user's own risk.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">7. Modifications</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            Karınca may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">8. Governing Law</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            These terms and conditions are governed by and construed in accordance with the laws of Turkey and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                        </p>

                        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                            <p className="text-sm text-neutral-500 dark:text-neutral-500">
                                If you have any questions about these Terms of Service, please contact us at legal@karinca.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
