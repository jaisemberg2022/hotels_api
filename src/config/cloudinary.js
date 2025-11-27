import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'
import { v4 as uuid } from 'uuid'
import { normalizePublicIdFromUrl } from '../lib/utils.js'

cloudinary.config()

export const uploadBufferToCloudinary = async (buffer, folder = 'uploads') => {
  return new Promise((resolve, reject) => {
    const publicId = uuid()
    const stream = cloudinary.uploader.upload_stream({
      folder,
      public_id: publicId,
      resource_type: 'image',
      transformation: [{ quality: 'auto', fetch_format: 'auto' }]
    }, (error, result) => {
      if (error) reject(error)
      else resolve(result)
    })

    streamifier.createReadStream(buffer).pipe(stream)
  })
}

export const deleteFromCloudinary = async (value) => {
  try {
    const publicId = normalizePublicIdFromUrl(value)
    if (!publicId) throw new Error("Invalid public ID or URL")
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: 'image' })
    return result // {result: 'ok'}
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
    throw error
  }
}