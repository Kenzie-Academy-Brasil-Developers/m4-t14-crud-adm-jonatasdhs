import { QueryConfig, QueryResult } from "pg"
import { client } from "../../database"
import { AppError } from '../../error'
import { ILoginRequest, IToken } from "../../interfaces/login.interfaces"
import { compare } from 'bcryptjs'
import { sign } from "jsonwebtoken"

export const createLoginService = async (loginData: ILoginRequest): Promise<IToken> => {
    let queryString: string = `
        SELECT 
            *
        FROM
            users
        WHERE
            email = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [loginData.email]
    }

    const user: QueryResult = await client.query(queryConfig)
    if(user.rowCount <= 0) {
        throw new AppError('Wrong email/password', 401)
    }

    const passwordValid: boolean = await compare(loginData.password, user.rows[0].password)

    if(!passwordValid) {
        throw new AppError('Wrong email/password', 401)
    }

    const token: string = sign(
        {   
            email: user.rows[0].email,
            admin: user.rows[0].admin 
        },
        String(process.env.SECRET_KEY),
        {expiresIn: '24h', subject: String(user.rows[0].id)}
    )
    
    return {token}
}   
