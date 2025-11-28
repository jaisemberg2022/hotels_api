import { catchError } from "../middlewares/catchError.js";
import Hotel from "../models/hotel.model.js";
import Reservation from "../models/reservation.model.js";
import User from "../models/user.model.js";

export const getAll = async (req, res) => {
     const { userId, hotelId, limit, offset } = req.query
  const where = {}
  if (userId) where.userId = userId
  if (hotelId) where.hotelId = hotelId

  const results = await Reservation.findAll({
    where,
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : undefined,
    include: [
      { model: User, attributes: { exclude: ['password'] } },
      { model: Hotel } // sin City
    ]
   });

  const total = await Reservation.count({ where });
  res.json({ total, results });
};

export const create = catchError(async (req, res) => {
    const { hotelId, checkIn, checkOut } = req.body;
  const userId = req.user.id;
  const result = await Reservation.create({ hotelId, userId , checkIn, checkOut});
  return res.status(201).json(result);
});

export const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Reservation.findByPk(id, { include: User });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

export const update = catchError(async (req, res) => {
  const { id } = req.params;
  const { checkIn, checkOut } = req.body;
  const dataToUpdate = {};
  if (checkIn !== undefined) dataToUpdate.checkIn = checkIn;
  if (checkOut !== undefined) dataToUpdate.checkOut = checkOut;
  const result = await Reservation.update(dataToUpdate, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

export const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Reservation.destroy({ where: { id } });
  return res.sendStatus(204);
});
