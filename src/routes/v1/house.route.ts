import express from 'express';

import validate from '../../middlewares/validate';
import { houseValidation } from '../../validations';
import { houseController } from '../../controllers';

const router = express.Router();

router.get(
  '/',
  validate(houseValidation.getHouses),

  houseController.getHouses
);
router.post(
  '/',
  validate(houseValidation.createHouse),

  houseController.createHouse
);
// router
//   .route('/:userId')
//   .get(auth('getHouses'), validate(houseValidation.getUser), houseController.getUser)
//   .patch(auth('manageUsers'), validate(houseValidation.updateUser), houseController.updateUser)
//   .delete(auth('manageUsers'), validate(houseValidation.deleteUser), houseController.deleteUser);

export default router;
