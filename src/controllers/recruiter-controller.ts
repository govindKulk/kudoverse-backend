import { Request, Response } from 'express';
import { db } from '../../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../utils/verify-jwt';


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
                role: "ADMIN",
                isAdminVerified: true
            }
        })
    } catch (error) {
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

        if(user.role !== 'ADMIN'){
            return res.status(401).send('Unauthorized');
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // generate token
        const token = jwt.sign({ user}, 'SECRET', { expiresIn: '1h' });
        return res.status(200).json({ message: "successfully logged in!", user, token });
        
    } catch (error) {
        return res.status(500).send('Error creating user');
    }
    

}

const postJob = async (req: Request, res: Response) => {

    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '');
    console.log(token, )

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    // verify token
    try {
        const decoded = verifyToken(token);

        if (decoded.user.role !== 'ADMIN'){
            return res.status(401).send('Unauthorized');
        }
        req.body.user = decoded.user;
    }catch(error){
        return res.status(401).send('Unauthorized');
    }
    const { title, description, location, experience,company, url,salaryRange,skills, user } = req.body;
    


    if (!title || !description || !location || !salaryRange || !experience || !company || !skills) {
        return res.status(400).send('All fields are required');
    }

    const job = await db.jobListing.create({
        data: {
            title,
            description,
            location,
            salaryRange,
            experience,
            company,
            skills,
            url,
            userId: user.id
        }
    });

    return res.status(201).send(job);

}

export {
    getUser,
    createUser,
    loginUser,
    postJob
}