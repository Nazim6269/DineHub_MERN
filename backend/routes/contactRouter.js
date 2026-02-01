
import express from "express";
import { createInquiry } from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/submit", createInquiry);

export { contactRouter };
