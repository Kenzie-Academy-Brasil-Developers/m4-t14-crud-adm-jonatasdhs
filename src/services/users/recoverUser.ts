import { QueryConfig } from 'pg'
import { client } from '../../database'
import { IUserResponse, IUserResult } from '../../interfaces/users.interfaces'
export const recoverUserService = async (userId: number): Promise<IUserResponse> => {
    const queryString: string = `
        UPDATE
            users
        SET(active) = ROW(TRUE)
        WHERE
            id = $1
        RETURNING
            id, name, email, active, admin;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult: IUserResult = await client.query(queryConfig)
    return queryResult.rows[0]
}