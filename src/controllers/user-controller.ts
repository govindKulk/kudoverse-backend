import { Express, Request, Response } from "express"
import { db } from "../../db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getUser = async (req: Request, res: Response) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    // get user from db
    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) {
        return res.status(404).send('User not found');
    }

    return res.status(200).send(user);
}

const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send('Name, email and password are required');
    }

    // create user in db

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let user;

    try {
        user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "USER"
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send('Error creating user');
    }



    return res.status(201).send(user);


}
const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    // find user in db


    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(404).send('User not found');
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // generate token
        const token = jwt.sign({ user }, 'SECRET', { expiresIn: '1h' });
        return res.status(200).json({ message: "successfully logged in!", user, token });
        
    } catch (error) {
        return res.status(500).send('Error creating user');
    }
    

}

const getApplications = async (req: Request, res: Response) => {
    const {user} = req.body;
    try {
        const applications = await db.application.findMany({
            where: {
                userId: user.id
            }
        })

        return res.status(200).json({applications});
    }catch(error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}
const uploadResume = (req: Request, res: Response) => { }
const applyJob = (req: Request, res: Response) => { }

export {
    getUser,
    createUser,
    loginUser,
    uploadResume,
    applyJob,
    getApplications
}