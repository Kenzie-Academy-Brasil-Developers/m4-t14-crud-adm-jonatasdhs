import { z } from 'zod'

export const userSchema = z.object({
    id: z.number().positive().int(),
    name: z.string().max(20).min(4),
    email: z.string().email().max(100),
    password: z.string().min(4),
    admin: z.boolean().optional().default(false),
    active: z.boolean().optional().default(true)
})

export const userCreateSchema = userSchema.omit({id: true})
export const userReturnSchema = userSchema.omit({password: true})
export const userReturnManySchema = userSchema.array()
export const allUsersSchema = z.array(userReturnSchema)
export const updateUserSchema = userCreateSchema.partial()