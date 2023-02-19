import "express-async-errors"
import { handleError } from './error'
import express, { Application } from 'express'

import { loginRoutes } from './routers/login.routes'
import { userRoutes } from './routers/users.routes'


export const app: Application = express()
app.use(express.json())

app.use("/users", userRoutes)
app.use("/login", loginRoutes)

app.use(handleError)