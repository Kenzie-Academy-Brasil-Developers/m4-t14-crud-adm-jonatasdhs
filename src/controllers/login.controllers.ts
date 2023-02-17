import {Request, Response} from 'express'
import { createLoginService } from '../services/login/createLogin'
export const createLoginControllers = async (req: Request, res: Response): Promise<Response> => {
    const loginData = req.body

    const token = await createLoginService(loginData)

    return res.status(200).json(token)
}