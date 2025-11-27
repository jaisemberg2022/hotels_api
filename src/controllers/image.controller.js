import { deleteFromCloudinary, uploadBufferToCloudinary } from '../config/cloudinary.js'
import { catchError } from '../middlewares/catchError.js'
import Image from '../models/image.model.js'

export const getAll = catchError(async (req, res) => {
    const images = await Image.findAll()
    return res.json(images)
})

export const create = catchError(async (req, res) => {
    const {hotelsId} = req.body
    const {url, fileName} = await uploadBufferToCloudinary(req.file.buffer, 'hotels')
    const image = await Image.create({url, hotelsId})
    return res.status(201).json(image) 
})

export const remove = catchError(async (req, res) => {
  const { id } = req.params
  const image = await Image.findByPk(id)
  if (!image) return res.sendStatus(404)
    await deleteFromCloudinary(image.url)
    await image.destroy()
    return res.sendStatus(204)
})