import { requireAuth } from "../middleware/requireAuth";
import { postJob, createUser, getUser, loginUser, getAllApplicants } from "../controllers/recruiter-controller";
import { Router } from "express";

const recruiterRouter = Router();

recruiterRouter.get('/me/:id', getUser);
recruiterRouter.post('/login', loginUser);
recruiterRouter.post('/register', createUser);
recruiterRouter.post('/postjob', requireAuth, postJob);

recruiterRouter.get('/applicants',requireAuth, getAllApplicants);




recruiterRouter.delete("/deleteJob", (req, res) => {
  res.send("Hello World");
});

export default recruiterRouter;