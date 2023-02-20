import { hash } from 'bcryptjs'
import { QueryConfig, QueryResult } from 'pg'
import format from 'pg-format'

import { client } from "../../database"
import { AppError } from '../../error'
import { IUserRequest, IUserResponse, IUserResult } from "../../interfaces/users.interfaces"

export const createUsersService = async (userData: IUserRequest): Promise<IUserResponse> => {

    const hashedPassword = await hash(userData.password, 10)
    userData.password = hashedPassword

    const queryString = format(
        `
        INSERT INTO 
            users(%I)
        VALUES(%L)
        RETURNING id, name, email, admin, active;
        `
        , 
        Object.keys(userData),
        Object.values(userData)
    )

    const queryResult: IUserResult = await client.query(queryString)
    
    return queryResult.rows[0]
}