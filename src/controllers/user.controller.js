import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const registerUser = asyncHandler(async (req, res) => {
    // get the data from the body
    // validate the data
    // check the existing user
    // hash the password
    // create a user

    const { username, email, password } = req.body
    const fieldCheck = [username, email, password].some((field) => field?.trim() === "")


    if (fieldCheck) {
        throw new apiError(400, "All fields are mandatory");
    }


    const emailChecker = await User.findOne({ email })

    if (emailChecker) {
        throw new apiError(400, "Email already exist")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username, email, password: hashedPassword
    })

    res.status(200).json(new ApiResponse(201, {
        email: user.email,
        username: user.username
    },
        "User created successfully"
    ))
})

const loginUser = asyncHandler(async (req, res) => {
    // get the data
    // validate the data
    // check the user exist 
    // compare the email and password 
    // generate the jwt token

    const { email, password } = req.body

    if ([email, password].some((field) => field?.trim === "")) {
        throw new apiError(400, "Please fill all the fields")
    }

    const isUserExist = await User.findOne({ email })
    if (!isUserExist) {
        throw new apiError(401, "No user found or wrong Credentials")
    }

    const hashedPassword = await User.findOne({ email })

    const comparePassword = await bcrypt.compare(password, hashedPassword.password)

    if (!comparePassword) {
        throw new apiError(400, "Wrong Credentials")
    }


    const accessToken = jwt.sign({
        email,
        username: isUserExist.username,
        id: isUserExist.id
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_SECRET_EXPIRY });


    res.status(200).json(
        new ApiResponse(200, {
            accessToken
        },
            "Token Generated Successfully")
    )

})

const currentuser = asyncHandler(async (req, res) => {
    res
    .status(200)
    .json(req.user)
})


export { registerUser, loginUser, currentuser }