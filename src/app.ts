import express, { Application } from 'express'

import { handleError } from './error'
import { loginRoutes } from './routers/login.routes'
import { userRoutes } from './routers/users.routes'

import "express-async-errors"

export const app: Application = express()
app.use(express.json())

app.use("/users", userRoutes)
app.use("/login", loginRoutes)

app.use(handleError)