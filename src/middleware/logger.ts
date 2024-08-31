import { NextFunction, Request, Response } from "express";
import verifyToken from "../utils/verify-jwt";

export async function logger(req: Request, res: Response, next: NextFunction){

    console.table({
        method: req.method,
        path: req.path,
        date: new Date()
    })

    next();
}

