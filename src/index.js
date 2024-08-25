import dotenv from "dotenv"
import { app } from "./app.js";
import { dbConnection } from "./database/index.js";


dotenv.config({
    path: "./env"
})


dbConnection().then(()=>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log("app is listening on port : " , process.env.PORT)
    })
})