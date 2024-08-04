import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

export async function POST(request: NextRequest) {
    if (!request.body) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        if (file.type !== 'image/png') {
            return NextResponse.json({ error: 'Uploaded file is not a PNG' }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const pngBuffer = Buffer.from(buffer);

        // Resize the image to 256x256 (typical for ICO)
        const resizedPngBuffer = await sharp(pngBuffer)
            .resize(256, 256)
            .png()
            .toBuffer();

        const icoBuffer = await pngToIco(resizedPngBuffer);

        return new NextResponse(icoBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/x-icon',
                'Content-Disposition': 'attachment; filename=converted.ico',
            },
        });
    } catch (error) {
        console.error('Conversion error:', error);
        return NextResponse.json({ error: 'Error converting image' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'This endpoint only supports POST requests' }, { status: 405 });
}