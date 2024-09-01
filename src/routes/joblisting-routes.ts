import { Router } from "express";
import { getAllJobs, getJob, applyJob, editApplication } from '../controllers/job-controller'

import { requireAuth } from "../middleware/requireAuth";

const jobListingRouter = Router();

jobListingRouter.get("/", getAllJobs);


jobListingRouter.post("/apply/:jobId", requireAuth, applyJob);
jobListingRouter.post("/edit-application/:jobId", requireAuth, editApplication);

jobListingRouter.get('/:jobId', getJob);

export default jobListingRouter;
