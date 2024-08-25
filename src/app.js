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
app.get("/", async(req, res) => {
   const html = "<p>Api is running...</p>"
   res.send(html)
})
app.use("/api/v1", todoRoute)
app.use("/api/v1", userRoute)


export {app}