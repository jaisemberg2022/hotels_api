import { catchError } from '../middlewares/catchError.js';
import Reviews from '../models/review.model.js';
import Hotel from '../models/hotel.model.js'
import User from '../models/user.model.js'

export const getAll = async (req, res) => {
  const { userId, hotelId, offset, perPage } = req.query;

  const where = {};
  if (userId) where.userId = userId;
  if (hotelId) where.hotelId = hotelId;

  const results = await Reviews.findAll({
    where,
    limit: perPage ? Number(perPage) : undefined,   
    offset: offset ? Number(offset) : undefined,    
    include: [
      { model: User, attributes: { exclude: ['password'] } },
      { model: Hotel },
    ],
  });
  const total = await Reviews.count({ where });
  res.json({ total, results });
};

export const create = catchError(async (req, res) => {
  const { hotelId, rating, comment } = req.body;
  const userId = req.user.user.id; 
  const result = await Reviews.create({ hotelId, userId, rating, comment });
  return res.status(201).json(result);
});

export const update = catchError(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const dataToUpdate = {};
  if (rating !== undefined) dataToUpdate.rating = rating;
  if (comment !== undefined) dataToUpdate.comment = comment;

  const result = await Reviews.update(dataToUpdate, {
    where: { id },
    returning: true,
  });

  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

export const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const deleted = await Reviews.destroy({ where: { id } });
  if (!deleted) return res.sendStatus(404);
  res.sendStatus(204);
});

