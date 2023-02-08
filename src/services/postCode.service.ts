/* eslint-disable camelcase */
import { Prisma, House } from '@prisma/client';

import prisma from '../client';

interface medAndMeanResponseType {
  average: number;
  median: number;
}
type resMedMean = medAndMeanResponseType;
/**
 * Query for users
 * @param {Object} filter - Mongo filter

 * @returns {Promise<QueryResult>}
 */
const queryPostCodes = async (
  filter: object
): Promise<Omit<House, 'id' | 'name' | 'desc' | 'price' | 'post_code'>[]> => {
  const houses = await prisma.house.findMany({
    select: {
      post_code: true
    }
  });
  return houses;
};
function findMean(a: number[]): number {
  let sum = 0;
  const n = a.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < n; i++) {
    sum += a[i];
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
): Promise<any> => {
  const result = await prisma.house.findMany({
    where: { post_code: id },
    select
  });
  const priceList = await result
    .map(p => (typeof p.price === 'string' ? parseInt(p.price, 10) : p.price))
    .filter(price => typeof price !== 'undefined');
  const average = findMean(priceList);
  const median = findMedian(priceList);

  const res = { average, median };
  return res;
};

export default {
  queryPostCodes,
  queryPostCodeById
};
