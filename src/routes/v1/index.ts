import express from 'express';

import houseRoute from './house.route';
import postCodeRoute from './postCode.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/home',
    route: houseRoute
  },
  {
    path: '/postCode',
    route: postCodeRoute
  }
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
