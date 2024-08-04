import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const { image } = await request.json();

        // 从Base64字符串中提取实际的图像数据
        const base64Data = image.replace(/^data:image\/png;base64,/, "");
        const imageBuffer = Buffer.from(base64Data, 'base64');

        // 使用sharp库将图像调整为256x256
        const resizedPngBuffer = await sharp(imageBuffer)
            .resize(256, 256)
            .png()
            .toBuffer();

        // 使用png-to-ico将PNG转换为ICO
        const icoBuffer = await pngToIco(resizedPngBuffer);

        // 将ICO转换为Base64
        const icoBase64 = icoBuffer.toString('base64');

        return NextResponse.json({ ico: icoBase64 });
    } catch (error) {
        console.error('Error converting image:', error);
        return NextResponse.json({ error: 'Error converting image' }, { status: 500 });
    }
}

