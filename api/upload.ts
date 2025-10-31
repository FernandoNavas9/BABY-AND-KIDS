import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import fs from 'fs';

// Vercel's node runtime doesn't parse multipart/form-data by default.
// We configure formidable to handle this.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    
    // formidable wraps files in an array, even if there's only one with the same name
    const uploadedFiles = files.files;

    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({ error: 'No files to upload.' });
    }

    const blobPromises = uploadedFiles.map(file => {
      // formidable provides the path to the temporary file
      const fileContent = fs.readFileSync(file.filepath);
      return put(file.originalFilename || 'unnamed-file', fileContent, {
        access: 'public',
        contentType: file.mimetype || undefined,
      });
    });

    const blobs = await Promise.all(blobPromises);
    const urls = blobs.map(blob => blob.url);

    return res.status(200).json({ urls });

  } catch (error) {
    console.error('Error uploading files:', error);
    return res.status(500).json({ error: 'Failed to upload files.' });
  }
}
