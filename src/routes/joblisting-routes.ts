import { Router } from "express";

const jobListingRouter = Router();

jobListingRouter.get("/", (req, res) => {
  res.send("Hello World");
});

jobListingRouter.post("/apply", (req, res) => {
  res.send("Hello World");
});

export default jobListingRouter;