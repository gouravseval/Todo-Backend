import express from "express"
import { todoRoute } from "./routes/todo.route.js"
import { userRoute } from "./routes/user.route.js";
import cors from "cors"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json());
app.use("/api/v1", todoRoute)
app.use("/api/v1", userRoute)


export {app}