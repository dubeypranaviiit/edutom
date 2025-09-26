import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(fileBuffer, filename) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: 'image', public_id: filename, folder: 'blog-images' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(fileBuffer);
  });
}
export async function deleteFromCloudinary(imageUrl) {
  try {
    // Get public_id from image URL
    const parts = imageUrl.split('/');
    const filename = parts[parts.length - 1].split('.')[0]; // e.g., "book-123456"
    const publicId = `book-images/${filename}`;

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });

    return result;
  } catch (error) {
    console.error('Cloudinary Delete Error:', error);
    throw error;
  }
}
