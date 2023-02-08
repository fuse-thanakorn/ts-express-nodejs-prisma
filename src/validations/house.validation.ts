import Joi from 'joi';

const createHouse = {
  body: Joi.object().keys({
    name: Joi.string(),
    desc: Joi.string(),
    price: Joi.string(),
    post_code: Joi.string()
  })
};
const getHouses = {
  query: Joi.object().keys({
    skip: Joi.number().integer(),
    take: Joi.number().integer()
  })
};
const getPostCode = {
  query: Joi.object().keys({

  })
};

export default {
  createHouse,
  getHouses,
  getPostCode
};
