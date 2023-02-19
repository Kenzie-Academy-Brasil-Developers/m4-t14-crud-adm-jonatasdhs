import { Router } from "express";

import { createUserControllers, readAllUsersControllers, readLoggedControllers, recoverUserControllers, softDeleteUserControllers, updateUserControllers } from "../controllers/users.controllers";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureToken.middlewares";
import { validateBodyMiddleware, validateUpdateMiddleware } from '../middlewares/validateBody.middlewares'
import { verifyUserMiddleware } from "../middlewares/verifyUser.middlewares";
import { updateUserSchema, userCreateSchema } from "../schemas/user.schemas";

export const userRoutes: Router = Router()

userRoutes.post('', validateBodyMiddleware(userCreateSchema), createUserControllers)
userRoutes.get('', readAllUsersControllers)
userRoutes.get('/profile', ensureTokenIsValidMiddleware, readLoggedControllers)
userRoutes.patch('/:id', ensureTokenIsValidMiddleware, validateUpdateMiddleware(updateUserSchema), verifyUserMiddleware, updateUserControllers)
userRoutes.delete('/:id', ensureTokenIsValidMiddleware, verifyUserMiddleware, softDeleteUserControllers)
userRoutes.put('/:id/recover', ensureTokenIsValidMiddleware, verifyUserMiddleware, recoverUserControllers)