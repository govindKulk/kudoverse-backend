import { applyJob, createUser, getUser, loginUser, uploadResume } from '../controllers/user-controller';
import {Router} from 'express';

const userRouter = Router();

userRouter.get('/:id', getUser);
userRouter.post('/login', loginUser);
userRouter.post('/register', createUser);
userRouter.post('/upload', uploadResume);
userRouter.post('/apply', applyJob);

export default userRouter;