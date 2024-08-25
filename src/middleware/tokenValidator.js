import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";

const tokenValidator = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new apiError(401, "Authorization token is missing or invalid");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        throw new apiError(401, "Invalid or expired token");
    }
};

export { tokenValidator };