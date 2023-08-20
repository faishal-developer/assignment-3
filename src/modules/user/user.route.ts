import express from 'express';
import { validateRequest } from '../../middleWares/validateRequests';
import { userZodValidataion } from './user.zod';
import { userController } from './user.controller';

const router = express.Router();

router.post(
  "/users/signup",
  validateRequest(userZodValidataion.createUser),
  userController.createUser
);

router.get('/users/:id',userController.getSingleUser);
router.delete('/users/:id',userController.deleteUser);
router.patch(
    '/users/:id',
    validateRequest(userZodValidataion.updateUser),
    userController.updateUser
);

router.get('/users',userController.getAllUser);


export const UserRoutes = router;