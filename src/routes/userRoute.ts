import { requireAuth } from '../middleware/requireAuth';
import { applyJob, createUser, getApplications, getUser, loginUser, uploadResume } from '../controllers/user-controller';
import {Router} from 'express';

const userRouter = Router();

userRouter.get('/me/:id', requireAuth, getUser);
userRouter.post('/login', loginUser);
userRouter.post('/register', createUser);
userRouter.post('/upload', uploadResume);
userRouter.get('/applications', requireAuth, getApplications);

export default userRouter;