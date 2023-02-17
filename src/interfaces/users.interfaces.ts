import { QueryResult } from "pg"
import { z } from "zod"
import { allUsersSchema, userReturnManySchema } from "../schemas/user.schemas"

export interface IUserRequest {
    name: string,
    email: string,
    admin: boolean,
    active: boolean,
    password: string
}

export interface IUser extends IUserRequest {
    id: number
}

export type IUserResponse = Omit<IUser, "password">
export type IUserResult = QueryResult<IUserResponse>
export type IAllUsersReturn = z.infer<typeof allUsersSchema>