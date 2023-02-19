import { NextFunction, Request, Response } from "express";
import { updateUserSchema, userCreateSchema } from "../schemas/user.schemas";
import { ZodTypeAny, ZodError, Schema } from 'zod'
import { loginSchema } from "../schemas/login.schemas";
 
export const validateBodyMiddleware = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction): void => {
    const validated = userCreateSchema.parse(req.body)
    
    req.body = validated
    
    return next()
}

export const validadeLoginMiddleware = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction): void => {
    const validate = loginSchema.parse(req.body)

    req.body = validate

    return next()
}

export const validateUpdateMiddleware = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction): void => {
    const validate = updateUserSchema.parse(req.body)

    req.body = validate

    return next()
}