import { Router } from "express";
import { uploadMany } from "../utils/multer.js";
import {
  getInvoices,
  getInvoiceById,
  getRejectedInvoice,
  uploadInvoice,
  getUploadsForHumanReview, 
} from "../controllers/invoice.controller.js";

import {isLoggedIn} from './../middlewares/auth.middlewares.js'

const router = Router();
router.use(isLoggedIn)
router.post("/", uploadMany, uploadInvoice);
router.get("/", getInvoices);
router.get("/rejected", getRejectedInvoice);
router.get("/:id", getInvoiceById);
router.get('/humanreview' , getUploadsForHumanReview)

export default router;
