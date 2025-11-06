import { Router } from "express";
import { uploadMany } from "../utils/multer.js";
import {
  getInvoices,
  getInvoiceById,
  getRejectedInvoice,
  uploadInvoice,
  getUploadsForHumanReview,
} from "../controllers/invoice.controller.js";

const router = Router();

router.post("/", uploadMany, uploadInvoice);

router.get("/", getInvoices);
router.get("/rejected", getRejectedInvoice);
router.get("/:id", getInvoiceById);
router.get('/humanreview' , getUploadsForHumanReview)

export default router;
