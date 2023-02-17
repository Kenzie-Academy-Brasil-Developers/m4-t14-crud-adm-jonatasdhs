import { Router } from "express";

import { createUserControllers, readAllUsersControllers, readLoggedControllers } from "../controllers/users.controllers";
import { ensureTokenExistsMiddleware } from "../middlewares/ensureToken.middlewares";
import { validateBodyMiddleware } from '../middlewares/validateBody.middlewares'
import { updateUserSchema, userCreateSchema } from "../schemas/user.schemas";
import { retrieveUserService } from "../services/users/retrieveUser";
import { updateUserService } from "../services/users/updateUser";

export const userRoutes: Router = Router()

userRoutes.post('', validateBodyMiddleware(userCreateSchema), createUserControllers)
userRoutes.get('', readAllUsersControllers)
userRoutes.get('/profile', ensureTokenExistsMiddleware, readLoggedControllers)
userRoutes.patch('/:id', validateBodyMiddleware(updateUserSchema), ensureTokenExistsMiddleware, )