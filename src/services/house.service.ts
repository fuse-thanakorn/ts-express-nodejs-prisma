/* eslint-disable camelcase */
import { Prisma, House } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createHouse = async (
  name: string,
  desc: string,
  price: string,
  post_code: string
): Promise<House> => prisma.house.create({
  data: {
    name,
    desc,
    price,
    post_code
  }
});

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.skip]
 * @param {number} [options.take]

 * @returns {Promise<QueryResult>}
 */
const queryHouses = async (
  filter: object,
  options: {
    skip?: number;
    take?: number;
  }
): Promise<Omit<House, 'id' | 'name' | 'desc' | 'price' | 'post_code'>[]> => {
  const skip = options.skip ?? 0;
  const limit = options.take ?? 5;
  const houses = await prisma.house.findMany({
    where: filter,
    select: {
      id: true,
      name: true,
      desc: true,
      price: true,
      post_code: true
    },
    skip,
    take: limit
  });
  return houses;
};

export default {
  createHouse,
  queryHouses

};
