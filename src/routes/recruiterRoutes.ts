import { postJob, createUser, getUser, loginUser } from "../controllers/recruiter-controller";
import { Router } from "express";

const recruiterRouter = Router();

recruiterRouter.get('/:id', getUser);
recruiterRouter.post('/login', loginUser);
recruiterRouter.post('/register', createUser);
recruiterRouter.post('/postjob', postJob);




recruiterRouter.delete("/deleteJob", (req, res) => {
  res.send("Hello World");
});

export default recruiterRouter;