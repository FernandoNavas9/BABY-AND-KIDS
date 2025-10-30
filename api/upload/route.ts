import { put } from '@vercel/blob';

export async function POST(request: Request): Promise<Response> {
  const form = await request.formData();
  const files = form.getAll('files') as File[];

  if (!files.length) {
    return new Response(JSON.stringify({ error: 'No files to upload.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  try {
    const blobPromises = files.map(file => {
      return put(file.name, file, { access: 'public' });
    });

    const blobs = await Promise.all(blobPromises);
    const urls = blobs.map(blob => blob.url);

    return new Response(JSON.stringify({ urls }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    return new Response(JSON.stringify({ error: 'Failed to upload files.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
