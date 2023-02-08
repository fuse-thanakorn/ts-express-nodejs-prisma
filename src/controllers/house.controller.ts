/* eslint-disable camelcase */
import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { houseService } from '../services';
import exclude from '../utils/exclude';

const createHouse = catchAsync(async (req, res) => {
  const {
    name, desc, price, post_code
  } = req.body;
  const result = await houseService.createHouse(name, desc, price, post_code);

  res.send(result);
});
const getHouses = catchAsync(async (req, res) => {
  const options = pick(req.query, ['skip', 'take']);
  const payload = await houseService.queryHouses({}, options);
  const count = payload.length;
  res.send({ payload, count });
});

export default {
  createHouse,
  getHouses

};
