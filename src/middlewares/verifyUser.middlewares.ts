import { Request, Response, NextFunction } from "express";
import { Query, QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";

export const verifyUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if(req.user.admin) next()
    const userId = req.user.id
    const paramsId = parseInt(req.params.id)

    const queryString: string = `
        SELECT
            id
        FROM 
            users
        WHERE
            id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [paramsId]
    }

    const queryUserIdResult = await client.query(queryConfig)
    if(queryUserIdResult.rows[0].id !== userId) {
        throw new AppError('Insufficient Permission', 403)
    } 

    next()
}

export const ensureEmailExists = async (req: Request, res: Response, next: NextFunction) => {
    
    const queryString: string = `
        SELECT 
            *
        FROM 
            users
        WHERE 
            email = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.body.email]
    }

    const queryResult: QueryResult = await client.query(queryConfig)
    if(queryResult.rowCount > 0) {
        throw new AppError('Email already exists', 409)
    }
    next()
}