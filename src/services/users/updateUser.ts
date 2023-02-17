import format from "pg-format"
import { client } from "../../database"
import { IUserResult } from "../../interfaces/users.interfaces"

export const updateUserService = async (payload: any) => {
    const queryString: string = format(`
        UPDATE
            users
        SET(%I) = ROW(%L)
        RETURNING 
            id, name, email, admin, active;
    `,
    Object.keys(payload),
    Object.values(payload))

    const queryResult: IUserResult = await client.query(queryString)

    return queryResult.rows[0]
}