import { Request, Response } from "express"
import { db } from "../../db"
const getAllJobs = async (req: Request, res: Response) => {
    try {
        const jobs = await db.jobListing.findMany({});
        return res.status(200).json({jobs});
    }catch(error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"});
    }

}

const getJob = async (req: Request, res: Response) => {

    const {jobId} = req.params;
    try {
        const job = await db.jobListing.findUnique({
            where: {
                id: jobId
            }
        });
        return res.status(200).json({job});
    }catch(error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"});
    }

}

const applyJob = async (req: Request, res: Response) => {

    const {jobId} = req.params;
    try {
        const {user} = req.body;

        // check if already applied
        const userApplication = await db.application.findFirst({
            where: {
                jobListingId: jobId,
                userId: user.id
            }
        })

        if(userApplication){
            return res.status(400).json({
                message: "You have already applied on the job!"
            })
        }


        const application = await db.application.create({
            data: {
                userId: user.id,
                jobListingId: jobId,
                status: 'PENDING'
            }
        });
        
        return res.status(200).json({application});
    }catch(error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"});
    }

}

export {
    getAllJobs,
    getJob,
    applyJob
}