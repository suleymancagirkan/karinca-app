import React from 'react'

const releases = [
    {
        date: 'Jul 12, 2025',
        title: 'Portfolio Editor 2.0 Released',
        image: 'https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/686ed4b38053be4cc4b6fc1c_tiptap_editor-3_blog.jpg',
    },
    {
        date: 'Jul 1, 2025',
        title: 'New Theme Options Added',
        image: 'https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/686ed4b38053be4cc4b6fc1c_tiptap_editor-3_blog.jpg',
    },
    {
        date: 'Jun 20, 2025',
        title: 'Real-Time Analytics Launched',
        image: 'https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/686ed4b38053be4cc4b6fc1c_tiptap_editor-3_blog.jpg',
    },
]

export default function ReleaseNotes() {
    return (
        <div className="flex flex-col items-start justify-center w-full gap-y-6 xl:px-40 xl:py-10 p-8 mt-10">
            <div className="flex justify-between w-full items-center">
                <span className="font-light text-black text-lg italic">Release Notes</span>
                <a href="/blogs" className="text-black text-base font-light hover:underline flex items-center gap-1">
                    All →
                </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full z-10 mt-5">
                <div className="flex flex-col w-full bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden hover:shadow-md transition">
                    {/* Görsel */}
                    <div className="w-full h-40 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                            alt="blog cover"
                            className="object-cover w-full h-full hover:scale-105 transition-transform"
                        />
                    </div>

                    <div className="p-4 flex flex-col gap-2">
                        <span className="text-xs font-semibold bg-black text-white px-2 py-1 rounded-lg w-fit shadow">
                            Update
                        </span>

                        <h3 className="text-lg font-bold text-black">
                            New Dark Mode Released
                        </h3>

                        <p className="text-sm text-black/65 line-clamp-2">
                            We&apos;ve introduced dark mode across the platform. Enjoy a better night-time experience!
                        </p>

                        <div className="flex items-center justify-between mt-3 text-xs text-black/50">
                            <div className="flex items-center gap-2">
                                <img
                                    src="https://randomuser.me/api/portraits/men/32.jpg"
                                    alt="Author"
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                                <span>John Smith</span>
                            </div>
                            <span>July 18, 2025</span>
                        </div>

                        <button className="text-black/70 hover:text-black font-medium transition text-xs text-left mt-2">
                            Read more →
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
