import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { AppError } from '../error'

import 'dotenv/config'

export const ensureTokenExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token = req.headers.authorization

    if(!token) {
        throw new AppError('Missing Bearer Token', 401)
    }

    token = token.split(" ")[1]

    jwt.verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {

        if(error) {
            throw new AppError(error.message, 401)
        }

        req.user = {
            id: parseInt(decoded.sub),
        }

        return next()

    })
} 