import { Request, Response, NextFunction } from "express";
import { Query, QueryConfig } from "pg";
import { client } from "../database";
import { AppError } from "../error";

export const verifyUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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