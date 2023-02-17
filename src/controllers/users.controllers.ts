import { Request, Response } from "express"
import { IUserRequest } from "../interfaces/users.interfaces"
import { createUsersService } from "../services/users/createUsers"
import { readAllUsersService } from '../services/users/readAllUsers'
import { retrieveUserService } from '../services/users/retrieveUser'
import { updateUserService } from "../services/users/updateUser"

export const createUserControllers = async (req: Request, res: Response): Promise<Response> => {
    
    const userData: IUserRequest = req.body

    const newUser = await createUsersService(userData)

    return res.status(201).json(newUser)
}

export const readAllUsersControllers = async (req: Request, res: Response): Promise<Response> => {
    
    const users = await readAllUsersService()

    return res.json(users)
}

export const readLoggedControllers = async (req: Request, res: Response): Promise<Response> => {

    const id: number = req.user.id

    const user = await retrieveUserService(id)
  
    return res.json(user);
}

export const updateUserControllers = async (req: Request, res: Response): Promise<Response> => {

    const userData: IUserRequest = req.body

    const updatedUser = await updateUserService(userData)

    return res.status(200).json(updatedUser)
}