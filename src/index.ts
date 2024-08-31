import express from 'express';
import userRouter from './routes/userRoute';
import recruiterRouter from './routes/recruiterRoutes';
import jobListingRouter from './routes/joblisting-routes';
import { logger } from './middleware/logger';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json());
app.use(logger)

app.use("/api/user", userRouter );
app.use("/api/admin", recruiterRouter );
app.use("/api/jobs", jobListingRouter)


app.listen(8000, () => {
    console.log('Server is running on port 3000');
})



