import {db} from '../db';
import { tot } from 'new';
import express from 'express';
import userRouter from './routes/userRoute';
import recruiterRouter from './routes/recruiterRoutes';

const app = express();

app.use(express.json());
app.use("/api/user", userRouter );
app.use("/api/admin", recruiterRouter );

app.listen(8000, () => {
    console.log('Server is running on port 3000');
})



