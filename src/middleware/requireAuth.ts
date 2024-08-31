import { NextFunction, Request, Response } from "express";
import verifyToken from "../utils/verify-jwt";

export async function requireAuth(req: Request, res: Response, next: NextFunction){
    const {authorization} = req.headers;
    try {
        const token = authorization.split('Bearer ')[1];
        const decoded = verifyToken(token);
        console.log(decoded, "deocded")
        req.body.user = decoded.user;

        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({message: "Unauthorized!"});
    }
}

