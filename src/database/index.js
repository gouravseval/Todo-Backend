import mongoose from "mongoose"

const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://gouravjangra0603:gourav123@gouravcluster.ttrh2.mongodb.net/")
        console.log("DB connected succesfully")
    } catch (error) {
        throw new error
    }
}

export {dbConnection}