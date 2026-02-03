
'use client';

import React, { useState, useEffect } from 'react';
import {
    TbSettings,
    TbDeviceFloppy,
    TbLoader,
    TbPhoto,
    TbAlertTriangle
} from 'react-icons/tb';
import toast from 'react-hot-toast';

export default function GeneralSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form State
    const [settings, setSettings] = useState({
        siteName: '',
        siteDescription: '',
        logoUrl: '',
        faviconUrl: '',
        maintenanceMode: false
    });

    // Fetch initial settings
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/admin/settings/general');
                const data = await res.json();
                if (res.ok) {
                    setSettings({
                        siteName: data.siteName || '',
                        siteDescription: data.siteDescription || '',
                        logoUrl: data.logoUrl || '/logo.svg',
                        faviconUrl: data.faviconUrl || '/favicon.ico',
                        maintenanceMode: data.maintenanceMode || false
                    });
                } else {
                    toast.error('Failed to load settings');
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
            const res = await fetch('/api/admin/settings/general', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });

            if (res.ok) {
                toast.success('Settings saved successfully');
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

    // Handle File Upload
    const handleUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        const loadingToast = toast.loading(`Uploading ${type}...`);

        try {
            const res = await fetch('/api/admin/settings/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (res.ok) {
                setSettings(prev => ({
                    ...prev,
                    [type === 'logo' ? 'logoUrl' : 'faviconUrl']: data.url.split('?')[0]
                }));
                toast.success(`${type} uploaded successfully`, { id: loadingToast });
            } else {
                toast.error(data.error || 'Upload failed', { id: loadingToast });
            }
        } catch (error) {
            console.error(error);
            toast.error('Error uploading file', { id: loadingToast });
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <TbLoader className="animate-spin text-neutral-400" size={32} />
                <p className="text-neutral-500 mt-2 text-sm">Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-black font-unbounded text-black dark:text-white mb-2">
                    General Settings
                </h1>
                <p className="text-neutral-500 font-medium">Manage your site information and preferences.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8 max-w-4xl">

                {/* Site Information Card */}
                <div className="bg-white dark:bg-[#111] p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-6">
                    <h2 className="text-xl font-bold font-unbounded text-black dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-4">
                        Site Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                                Site Name
                            </label>
                            <input
                                type="text"
                                name="siteName"
                                value={settings.siteName}
                                onChange={handleChange}
                                placeholder="My Awesome App"
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-medium text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                                Site Description
                            </label>
                            <input
                                type="text"
                                name="siteDescription"
                                value={settings.siteDescription}
                                onChange={handleChange}
                                placeholder="The best app for..."
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-medium text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Branding Card */}
                <div className="bg-white dark:bg-[#111] p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-6">
                    <h2 className="text-xl font-bold font-unbounded text-black dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-4 flex items-center gap-2">
                        <TbPhoto /> Branding
                    </h2>

                    <div className="space-y-8">
                        {/* Logo Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                                Site Logo
                            </label>
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-32 h-32 bg-neutral-50 dark:bg-neutral-900 rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-center p-2 relative group overflow-hidden">
                                    {settings.logoUrl ? (
                                        <img src={settings.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <span className="text-xs text-neutral-400 font-medium">No Logo</span>
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <p className="text-xs text-neutral-500 mb-2">
                                        Ideally use an SVG or transparent PNG. Recommended size: 200x200px.
                                    </p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="logoUrl"
                                            value={settings.logoUrl}
                                            onChange={handleChange}
                                            placeholder="/logo.svg"
                                            className="flex-1 px-4 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 outline-none text-sm font-mono text-neutral-500"
                                        />
                                        <label className="cursor-pointer bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-bold hover:opacity-80 transition-opacity whitespace-nowrap">
                                            Upload New
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleUpload(e, 'logo')}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Favicon Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                                Favicon
                            </label>
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-16 h-16 bg-neutral-50 dark:bg-neutral-900 rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-center p-2">
                                    {settings.faviconUrl ? (
                                        <img src={settings.faviconUrl} alt="Favicon" className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <span className="text-xs text-neutral-400 font-medium">None</span>
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <p className="text-xs text-neutral-500 mb-2">
                                        Valid formats: .ico, .png, .svg.
                                    </p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="faviconUrl"
                                            value={settings.faviconUrl}
                                            onChange={handleChange}
                                            placeholder="/favicon.ico"
                                            className="flex-1 px-4 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 outline-none text-sm font-mono text-neutral-500"
                                        />
                                        <label className="cursor-pointer bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-bold hover:opacity-80 transition-opacity whitespace-nowrap">
                                            Upload New
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept=".ico,.png,.svg,.jpg"
                                                onChange={(e) => handleUpload(e, 'favicon')}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Maintenance Mode Card */}
                <div className="bg-white dark:bg-[#111] p-8 rounded-2xl border border-red-100 dark:border-red-900/30 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-red-500">
                        <TbAlertTriangle size={100} />
                    </div>

                    <h2 className="text-xl font-bold font-unbounded text-black dark:text-white border-b border-red-50 dark:border-red-900/20 pb-4 relative z-10">
                        System Status
                    </h2>

                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <h3 className="font-bold text-neutral-900 dark:text-white">Maintenance Mode</h3>
                            <p className="text-sm text-neutral-500 max-w-sm mt-1">
                                Prevent non-admin users from accessing the site. Useful during updates.
                            </p>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="maintenanceMode"
                                checked={settings.maintenanceMode}
                                onChange={handleChange}
                                className="sr-only peer"
                            />
                            <div className="w-14 h-7 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
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
