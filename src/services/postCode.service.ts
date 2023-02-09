/* eslint-disable prefer-const */
/* eslint-disable camelcase */
import { Prisma, House } from '@prisma/client';

import prisma from '../client';

interface medAndMeanResponseType {
  average: number | 0;
  median: number | 0;
}

/**
 * Query for users
 * @param {Object} filter - Mongo filter

 * @returns {Promise<QueryResult>}
 */
const queryPostCodes = async (
  filter: object
): Promise<Omit<House, 'id' | 'name' | 'desc' | 'price' | 'post_code'>[]> => {
  const houses = await prisma.house.findMany({
    select: { post_code: true },
    distinct: 'post_code'
  });
  return houses;
};
function findMean(numbers: number[]): number {
  let sum = 0;
  const n = numbers.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < n; i++) {
    sum += numbers[i];
  }

  return sum / n;
}

function findMedian(numbers: number[]): number {
  numbers.sort((a, b) => a - b);
  const middle = Math.floor(numbers.length / 2);
  if (numbers.length % 2 === 0) {
    return (numbers[middle - 1] + numbers[middle]) / 2;
  }
  return numbers[middle];
}
const queryPostCodeById = async (
  id: string,
  select: Prisma.HouseSelect = {
    price: true
  }
): Promise<medAndMeanResponseType> => {
  let average: number | 0;
  let median: number | 0;

  const result = await prisma.house.findMany({
    where: { post_code: id },
    select
  });

  const priceList = (await result
    .map(p => (typeof p.price === 'string' ? parseInt(p.price, 10) : p.price))
    .filter(price => typeof price === 'number')) as number[];

  average = findMean(priceList) || 0;
  median = findMedian(priceList) || 0;

  return { average, median };
};

export default {
  queryPostCodes,
  queryPostCodeById
};
