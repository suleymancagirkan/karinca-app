
'use client';

import React, { useState, useEffect } from 'react';
import {
    TbSeo,
    TbDeviceFloppy,
    TbLoader,
    TbPhoto,
    TbBrandGoogleAnalytics,
    TbBrandTwitter
} from 'react-icons/tb';
import toast from 'react-hot-toast';

export default function SeoSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form State
    const [settings, setSettings] = useState({
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        ogImage: '',
        twitterHandle: '',
        googleAnalyticsId: ''
    });

    // Fetch initial settings
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/admin/settings/seo');
                const data = await res.json();
                if (res.ok) {
                    setSettings({
                        metaTitle: data.metaTitle || '',
                        metaDescription: data.metaDescription || '',
                        metaKeywords: data.metaKeywords || '',
                        ogImage: data.ogImage || '',
                        twitterHandle: data.twitterHandle || '',
                        googleAnalyticsId: data.googleAnalyticsId || ''
                    });
                } else {
                    toast.error('Failed to load SEO settings');
                }
            } catch (error) {
                console.error(error);
                toast.error('Error loading settings');
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    // Handle Save
    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch('/api/admin/settings/seo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });

            if (res.ok) {
                toast.success('SEO settings saved');
            } else {
                toast.error('Failed to save settings');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error saving settings');
        } finally {
            setSaving(false);
        }
    };

    // Handle File Upload for OG Image
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'og-image');

        const loadingToast = toast.loading('Uploading image...');

        try {
            const res = await fetch('/api/admin/settings/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (res.ok) {
                setSettings(prev => ({
                    ...prev,
                    ogImage: data.url.split('?')[0]
                }));
                toast.success('Image uploaded', { id: loadingToast });
            } else {
                toast.error(data.error || 'Upload failed', { id: loadingToast });
            }
        } catch (error) {
            console.error(error);
            toast.error('Error uploading file', { id: loadingToast });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <TbLoader className="animate-spin text-neutral-400" size={32} />
                <p className="text-neutral-500 mt-2 text-sm">Loading SEO settings...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-black font-unbounded text-black dark:text-white mb-2">
                    SEO Configuration
                </h1>
                <p className="text-neutral-500 font-medium">Manage search engine optimization and social sharing settings.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8 max-w-4xl">

                {/* Global Metadata Card */}
                <div className="bg-white dark:bg-[#111] p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-6">
                    <h2 className="text-xl font-bold font-unbounded text-black dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-4 flex items-center gap-2">
                        <TbSeo /> Global Metadata
                    </h2>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                                Default Meta Title
                            </label>
                            <input
                                type="text"
                                name="metaTitle"
                                value={settings.metaTitle}
                                onChange={handleChange}
                                placeholder="Karinca App - The Ultimate Platform"
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-medium text-sm"
                            />
                            <p className="text-xs text-neutral-500">Used as the default title when a page specific title is missing.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                                Meta Description
                            </label>
                            <textarea
                                name="metaDescription"
                                value={settings.metaDescription}
                                onChange={handleChange}
                                rows={3}
                                placeholder="A brief description of your site for search engines..."
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-medium text-sm resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                                Keywords
                            </label>
                            <input
                                type="text"
                                name="metaKeywords"
                                value={settings.metaKeywords}
                                onChange={handleChange}
                                placeholder="app, platform, saas, nextjs"
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-medium text-sm"
                            />
                            <p className="text-xs text-neutral-500">Separate keywords with commas.</p>
                        </div>
                    </div>
                </div>

                {/* Social & OG Image Card */}
                <div className="bg-white dark:bg-[#111] p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-6">
                    <h2 className="text-xl font-bold font-unbounded text-black dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-4 flex items-center gap-2">
                        <TbPhoto /> Social Media & Sharing
                    </h2>

                    <div className="space-y-6">
                        {/* OG Image Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                                Default OpenGraph (OG) Image
                            </label>
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-64 h-36 bg-neutral-50 dark:bg-neutral-900 rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-center p-2 relative group overflow-hidden shrink-0">
                                    {settings.ogImage ? (
                                        <img src={settings.ogImage} alt="OG Preview" className="w-full h-full object-cover rounded-lg" />
                                    ) : (
                                        <span className="text-xs text-neutral-400 font-medium">No Image</span>
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <p className="text-xs text-neutral-500 mb-2">
                                        Displayed when your site is shared on social media (Twitter, LinkedIn, WhatsApp etc.). Recommended size: 1200x630px.
                                    </p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="ogImage"
                                            value={settings.ogImage}
                                            onChange={handleChange}
                                            placeholder="https://example.com/og-image.jpg"
                                            className="flex-1 px-4 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 outline-none text-sm font-mono text-neutral-500"
                                        />
                                        <label className="cursor-pointer bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-bold hover:opacity-80 transition-opacity whitespace-nowrap">
                                            Upload
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleUpload}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                                <TbBrandTwitter size={18} /> Twitter Handle
                            </label>
                            <input
                                type="text"
                                name="twitterHandle"
                                value={settings.twitterHandle}
                                onChange={handleChange}
                                placeholder="@username"
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-medium text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Integrations Card */}
                <div className="bg-white dark:bg-[#111] p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-6">
                    <h2 className="text-xl font-bold font-unbounded text-black dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-4 flex items-center gap-2">
                        <TbBrandGoogleAnalytics /> Integrations
                    </h2>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                                Google Analytics ID (G-XXXXXXXXXX)
                            </label>
                            <input
                                type="text"
                                name="googleAnalyticsId"
                                value={settings.googleAnalyticsId}
                                onChange={handleChange}
                                placeholder="G-ABC1234567"
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-medium text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-bold font-unbounded text-sm hover:opacity-80 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
                    >
                        {saving ? <TbLoader className="animate-spin" size={20} /> : <TbDeviceFloppy size={20} />}
                        Save Changes
                    </button>
                </div>

            </form>
        </div>
    );
}
