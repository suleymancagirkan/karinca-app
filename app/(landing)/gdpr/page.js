import React from 'react';

export default function GDPR() {
    return (
        <div className="xl:px-40 xl:py-20 p-8 mt-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-black text-black dark:text-white tracking-tight mb-6">
                        GDPR Compliance
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                        Last updated: December 2024
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">What is GDPR</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect on May 25, 2018. It applies to all organizations that process personal data of EU residents, regardless of where the organization is located.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Our Commitment to GDPR</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            Karınca is committed to protecting your privacy and ensuring compliance with GDPR. We have implemented appropriate technical and organizational measures to safeguard your personal data and respect your privacy rights.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Legal Basis for Processing</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                            We process your personal data based on the following legal grounds:
                        </p>
                        <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 mb-6 space-y-2">
                            <li><strong>Consent:</strong> When you have given clear consent for us to process your data</li>
                            <li><strong>Contract:</strong> When processing is necessary for the performance of a contract</li>
                            <li><strong>Legal obligation:</strong> When we are required to process data to comply with legal obligations</li>
                            <li><strong>Legitimate interests:</strong> When processing is necessary for our legitimate business interests</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Your Rights Under GDPR</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                            As an EU resident, you have the following rights regarding your personal data:
                        </p>
                        <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 mb-6 space-y-2">
                            <li><strong>Right of access:</strong> You can request information about the personal data we hold about you</li>
                            <li><strong>Right to rectification:</strong> You can request correction of inaccurate or incomplete data</li>
                            <li><strong>Right to erasure:</strong> You can request deletion of your personal data in certain circumstances</li>
                            <li><strong>Right to restrict processing:</strong> You can request limitation of how we process your data</li>
                            <li><strong>Right to data portability:</strong> You can request a copy of your data in a structured format</li>
                            <li><strong>Right to object:</strong> You can object to processing based on legitimate interests</li>
                            <li><strong>Rights related to automated decision-making:</strong> You have rights regarding automated processing</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Data Protection Officer</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            We have appointed a Data Protection Officer (DPO) to oversee our GDPR compliance. You can contact our DPO at dpo@karinca.com for any questions or concerns about how we handle your personal data.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Data Breach Notification</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            In the event of a data breach that poses a risk to your rights and freedoms, we will notify the relevant supervisory authority within 72 hours and inform affected individuals without undue delay.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">International Data Transfers</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            When we transfer your personal data outside the European Economic Area (EEA), we ensure appropriate safeguards are in place, such as Standard Contractual Clauses or adequacy decisions by the European Commission.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Supervisory Authority</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            You have the right to lodge a complaint with a supervisory authority if you believe we have not handled your personal data in accordance with GDPR. The relevant supervisory authority depends on your location.
                        </p>

                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Contact Us</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            If you have any questions about our GDPR compliance or wish to exercise your rights, please contact us at gdpr@karinca.com. We will respond to your request within one month.
                        </p>

                        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                            <p className="text-sm text-neutral-500 dark:text-neutral-500">
                                This GDPR compliance statement is part of our commitment to protecting your privacy and ensuring transparency in how we handle your personal data.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
