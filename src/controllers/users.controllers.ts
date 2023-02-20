import { Request, Response } from "express"
import { IUserRequest } from "../interfaces/users.interfaces"
import { createUsersService } from "../services/users/createUsers"
import { readAllUsersService } from '../services/users/readAllUsers'
import { recoverUserService } from "../services/users/recoverUser"
import { retrieveUserService } from '../services/users/retrieveUser'
import { softDeleteUserService } from "../services/users/softDeleteUser"
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
    const userId: number = req.user.id

    const updatedUser = await updateUserService(userData, userId)

    return res.status(200).json(updatedUser)
}

export const softDeleteUserControllers = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = req.user.id
    
    await softDeleteUserService(userId)

    return res.status(204).send()
}

export const recoverUserControllers = async (req: Request, res: Response): Promise<Response> => {
    const paramsId: number = parseInt(req.params.id)

    const recoveredUser = await recoverUserService(paramsId)

    return res.status(200).json(recoveredUser)
}