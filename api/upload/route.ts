import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const form = await request.formData();
  const files = form.getAll('files') as File[];

  if (!files.length) {
    return NextResponse.json({ error: 'No files to upload.' }, { status: 400 });
  }
  
  try {
    const blobPromises = files.map(file => {
      return put(file.name, file, { access: 'public' });
    });

    const blobs = await Promise.all(blobPromises);
    const urls = blobs.map(blob => blob.url);

    return NextResponse.json({ urls });
  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json({ error: 'Failed to upload files.' }, { status: 500 });
  }
}
