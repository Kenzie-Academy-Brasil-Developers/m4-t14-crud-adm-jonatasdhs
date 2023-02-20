import { QueryConfig, QueryResult } from 'pg'
import { client } from '../../database'
import { AppError } from '../../error'
import { IUserResponse, IUserResult } from '../../interfaces/users.interfaces'
export const recoverUserService = async (paramsId: number): Promise<IUserResponse> => {
    let queryString: string = `
        SELECT
            active
        FROM 
            users
        WHERE
            id = $1;
    `

    let queryConfig: QueryConfig = {
        text: queryString,
        values: [paramsId]
    }

    const queryActiveResult: QueryResult = await client.query(queryConfig)

    if(queryActiveResult.rows[0].active === true) throw new AppError('User already active', 400)

    queryString = `
        UPDATE
            users
        SET(active) = ROW(TRUE)
        WHERE
            id = $1
        RETURNING
            id, name, email, active, admin;
    `

    queryConfig = {
        text: queryString,
        values: [paramsId]
    }

    const queryResult: IUserResult = await client.query(queryConfig)
    return queryResult.rows[0]
}