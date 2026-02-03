
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

// Helper to ensure directory exists
const ensureDirectory = async (dirPath) => {
    try {
        await fs.promises.access(dirPath);
    } catch (error) {
        await fs.promises.mkdir(dirPath, { recursive: true });
    }
};

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const formData = await req.formData();
        const file = formData.get('file');
        const type = formData.get('type'); // 'logo' or 'favicon'

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Define filename - strict naming as requested by user ("bunlar ... olacaklar")
        // But we must respect extension for image validity usually.
        // However, to strictly follow "logo.svg" and "favicon.ico" replacement request:
        let filename;
        if (type === 'logo') {
            // We'll keep the original extension to avoid corruption, 
            // but the user wants it to effectively replace the main logo.
            // Since we use the DB URL, the filename matters less, but let's keep it clean.
            // If they really want to overwrite `logo.svg`, we should literally target that.
            // BUT, if they upload a PNG, naming it .svg is invalid.
            // Let's settle on: overwrite if extension matches, else create new standard name.
            const ext = path.extname(file.name);
            filename = `logo${ext}`;
        } else if (type === 'favicon') {
            // Browsers are picky about favicons.
            const ext = path.extname(file.name);
            filename = `favicon${ext}`;
        } else {
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }

        // Save to public directory
        const publicDir = path.join(process.cwd(), 'public');
        const filePath = path.join(publicDir, filename);

        await writeFile(filePath, buffer);

        // Return the relative URL
        const fileUrl = `/${filename}?v=${Date.now()}`; // Cache busting param

        return NextResponse.json({ url: fileUrl });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
