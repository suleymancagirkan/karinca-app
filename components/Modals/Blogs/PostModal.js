
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbDeviceFloppy, TbLoader, TbPhoto, TbBold, TbItalic, TbLink, TbCode, TbH1, TbH2, TbList, TbListNumbers, TbBlockquote, TbMarkdown } from 'react-icons/tb';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import toast from 'react-hot-toast';
import { marked } from 'marked';

const MenuBar = ({ editor, onImportMarkdown }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-1 p-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-black sticky top-0 z-10 items-center">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors ${editor.isActive('bold') ? 'bg-neutral-200 dark:bg-neutral-800 text-blue-500' : 'text-neutral-600 dark:text-neutral-400'}`}
                title="Bold"
            >
                <TbBold size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors ${editor.isActive('italic') ? 'bg-neutral-200 dark:bg-neutral-800 text-blue-500' : 'text-neutral-600 dark:text-neutral-400'}`}
                title="Italic"
            >
                <TbItalic size={18} />
            </button>
            <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700 mx-1 self-center"></div>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-neutral-200 dark:bg-neutral-800 text-blue-500' : 'text-neutral-600 dark:text-neutral-400'}`}
                title="H2"
            >
                <TbH1 size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-neutral-200 dark:bg-neutral-800 text-blue-500' : 'text-neutral-600 dark:text-neutral-400'}`}
                title="H3"
            >
                <TbH2 size={18} />
            </button>
            <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700 mx-1 self-center"></div>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors ${editor.isActive('bulletList') ? 'bg-neutral-200 dark:bg-neutral-800 text-blue-500' : 'text-neutral-600 dark:text-neutral-400'}`}
                title="Bullet List"
            >
                <TbList size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors ${editor.isActive('orderedList') ? 'bg-neutral-200 dark:bg-neutral-800 text-blue-500' : 'text-neutral-600 dark:text-neutral-400'}`}
                title="Ordered List"
            >
                <TbListNumbers size={18} />
            </button>
            <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700 mx-1 self-center"></div>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors ${editor.isActive('blockquote') ? 'bg-neutral-200 dark:bg-neutral-800 text-blue-500' : 'text-neutral-600 dark:text-neutral-400'}`}
                title="Blockquote"
            >
                <TbBlockquote size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors ${editor.isActive('codeBlock') ? 'bg-neutral-200 dark:bg-neutral-800 text-blue-500' : 'text-neutral-600 dark:text-neutral-400'}`}
                title="Code Block"
            >
                <TbCode size={18} />
            </button>
            <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700 mx-1 self-center"></div>
            <button
                type="button"
                onClick={() => {
                    const url = window.prompt('URL');
                    if (url) {
                        editor.chain().focus().setLink({ href: url }).run();
                    }
                }}
                className={`p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors ${editor.isActive('link') ? 'bg-neutral-200 dark:bg-neutral-800 text-blue-500' : 'text-neutral-600 dark:text-neutral-400'}`}
                title="Link"
            >
                <TbLink size={18} />
            </button>

            <div className="flex-1"></div>

            <button
                type="button"
                onClick={onImportMarkdown}
                className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-900 hover:bg-blue-50 hover:text-blue-600 text-neutral-600 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider rounded border border-neutral-200 dark:border-neutral-800 transition-colors"
                title="Paste Markdown content"
            >
                <TbMarkdown size={16} />
                <span>Paste MD</span>
            </button>
        </div>
    );
};

// MenuBar...

export default function PostModal({ isOpen, onClose, onSuccess, post = null }) {
    const [formData, setFormData] = useState({
        title: '',
        image: ''
    });
    // Removed categories state
    const [loading, setLoading] = useState(false);
    // Removed initialLoading, or keep it false?
    // We were fetching categories in useEffect. Now we don't.
    // So initialLoading is not needed or just false.

    const editor = useEditor({
        extensions: [
            StarterKit,
            LinkExtension.configure({ openOnClick: false }),
            ImageExtension,
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert prose-sm sm:prose-base focus:outline-none min-h-[300px] p-4 max-w-none',
            },
        },
        immediatelyRender: false,
    });

    // Removed Category Fetching useEffect

    useEffect(() => {
        if (post && editor) {
            setFormData({
                title: post.title,
                image: post.image || ''
            });
            editor.commands.setContent(post.content);
        } else if (editor) {
            setFormData({
                title: '',
                image: ''
            });
            editor.commands.setContent('');
        }
    }, [post, isOpen, editor]);

    const handleImportMarkdown = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (!text) {
                toast.error('Clipboard is empty');
                return;
            }

            // Convert Markdown to HTML using 'marked'
            const html = marked.parse(text);

            // Insert into editor
            editor.commands.setContent(html);
            toast.success('Markdown imported!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to read clipboard');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const content = editor.getHTML();

        try {
            const url = post
                ? `/api/admin/blogs/posts/${post.id}`
                : '/api/admin/blogs/posts';

            const method = post ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, content })
            });

            if (!res.ok) throw new Error('Failed to save post');

            toast.success(post ? 'Post updated' : 'Post created');
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error('Operation failed');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-[#111] w-full max-w-4xl rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col h-[90vh]"
                >
                    <div className="flex justify-between items-center p-6 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
                        <h3 className="font-unbounded font-bold text-lg text-neutral-900 dark:text-white">
                            {post ? 'Edit Post' : 'New Post'}
                        </h3>
                        <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                            <TbX size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                        <div className="w-full md:w-80 border-r border-neutral-200 dark:border-neutral-800 p-6 space-y-6 overflow-y-auto shrink-0 bg-neutral-50/50 dark:bg-black/50">
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                                    Post Details
                                </label>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-neutral-700 dark:text-neutral-300 block mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="Enter title"
                                        />
                                    </div>
                                    {/* Category Select Removed */}
                                    <div>
                                        <label className="text-sm text-neutral-700 dark:text-neutral-300 block mb-1">Feature Image</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={formData.image}
                                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black focus:ring-2 focus:ring-blue-500 outline-none"
                                                placeholder="https://..."
                                            />
                                            <TbPhoto className="absolute left-2.5 top-2.5 text-neutral-400 text-base" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {formData.image && (
                                <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 aspect-video relative">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#111] overflow-hidden">
                            <MenuBar editor={editor} onImportMarkdown={handleImportMarkdown} />
                            <div className="flex-1 overflow-y-auto cursor-text text-black dark:text-white" onClick={() => editor?.commands.focus()}>
                                <EditorContent editor={editor} />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0A0A0A] flex justify-end shrink-0">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-8 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg font-bold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {loading ? <TbLoader className="animate-spin" /> : <TbDeviceFloppy />}
                            {post ? 'Update' : 'Publish'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
