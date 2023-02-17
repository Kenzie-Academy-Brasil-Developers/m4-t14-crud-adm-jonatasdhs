import { Request, Response } from 'express'
import { QueryConfig } from 'pg'

import { client } from '../../database'
import { IUserResponse, IUserResult } from '../../interfaces/users.interfaces'

export const retrieveUserService = async (id: number): Promise<IUserResponse> => {
    const queryString: string = `
      SELECT
        id, name, email, admin, active
      FROM 
        users
      WHERE 
        id = $1
    `

    const queryConfig: QueryConfig = {
      text: queryString,
      values:[id]
    }
    
    const queryResult: IUserResult = await client.query(queryConfig)
    return queryResult.rows[0]
}