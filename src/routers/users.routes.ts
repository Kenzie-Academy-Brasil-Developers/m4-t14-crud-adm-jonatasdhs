import { Router } from "express";

import { createUserControllers, readAllUsersControllers, readLoggedControllers, recoverUserControllers, softDeleteUserControllers, updateUserControllers } from "../controllers/users.controllers";
import { ensureTokenIsValidMiddleware, ensureUserIsAdmin } from "../middlewares/ensureToken.middlewares";
import { validateBodyMiddleware, validateUpdateMiddleware } from '../middlewares/validateBody.middlewares'
import { ensureEmailExists, verifyUserMiddleware } from "../middlewares/verifyUser.middlewares";
import { updateUserSchema, userCreateSchema } from "../schemas/user.schemas";

export const userRoutes: Router = Router()

userRoutes.post('', validateBodyMiddleware(userCreateSchema), ensureEmailExists,createUserControllers)
userRoutes.get('', ensureTokenIsValidMiddleware, ensureUserIsAdmin, readAllUsersControllers)
userRoutes.get('/profile', ensureTokenIsValidMiddleware, readLoggedControllers)
userRoutes.patch('/:id', ensureEmailExists, ensureTokenIsValidMiddleware, verifyUserMiddleware, validateUpdateMiddleware(updateUserSchema), updateUserControllers)
userRoutes.delete('/:id', ensureTokenIsValidMiddleware, verifyUserMiddleware, softDeleteUserControllers)
userRoutes.put('/:id/recover', ensureTokenIsValidMiddleware, ensureUserIsAdmin, recoverUserControllers)