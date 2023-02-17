import {z} from 'zod'
import { loginSchema } from '../schemas/login.schemas'

export interface IToken {
    token: string
}

export type ILoginRequest = z.infer<typeof loginSchema>