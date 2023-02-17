import { QueryResult } from "pg"

import { client } from "../../database"
import { IAllUsersReturn } from "../../interfaces/users.interfaces"

export const readAllUsersService = async (): Promise<IAllUsersReturn> => {
    
    const queryString: string = `
        SELECT
            id, name, email, admin, active
        FROM
            users;
    `
    const queryResult = await client.query(queryString)
    
    return queryResult.rows
}