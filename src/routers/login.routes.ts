import { Router } from "express";
import { loginSchema } from "../schemas/login.schemas";
import { createLoginControllers } from "../controllers/login.controllers";
import {validadeLoginMiddleware } from '../middlewares/validateBody.middlewares'

export const loginRoutes: Router = Router()

loginRoutes.post('', validadeLoginMiddleware(loginSchema),createLoginControllers)