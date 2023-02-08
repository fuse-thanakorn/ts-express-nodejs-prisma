import express from 'express';

import validate from '../../middlewares/validate';
import { postCodeValidation } from '../../validations';
import { postCodeController } from '../../controllers';

const router = express.Router();

router.get(
  '/',
  validate(postCodeValidation.getPostCodes),

  postCodeController.getPostCodes
);
router.get(
  '/:id',
  validate(postCodeValidation.getPostCodeById),

  postCodeController.getPostCodeById
);

export default router;
