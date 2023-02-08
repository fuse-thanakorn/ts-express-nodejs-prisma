/* eslint-disable camelcase */
import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { postCodeService } from '../services';

const getPostCodes = catchAsync(async (req, res) => {
  const payload = await postCodeService.queryPostCodes({});
  const count = payload.length;
  res.send({ payload, count });
});
const getPostCodeById = catchAsync(async (req, res) => {
  const payload = await postCodeService.queryPostCodeById(req.params.id);
  if (!payload) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post Code not found');
  }
  res.send(payload);
});

export default {
  getPostCodeById,
  getPostCodes
};
