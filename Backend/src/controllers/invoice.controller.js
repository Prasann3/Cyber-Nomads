import Invoice from "../models/invoice.model.js";
import { Queue } from "bullmq";
import "dotenv/config";

const invoiceQueue = new Queue("invoice", {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    return res.status(200).json({
      success: true,
      data: invoices,
      message: "Invoices fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching invoices",
    });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: invoice,
      message: "Invoice fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching invoice",
    });
  }
};

export const getRejectedInvoice = async (req, res) => {
  try {
    const rejectedInvoices = await Invoice.find({ status: "rejected" });
    return res.status(200).json({
      success: true,
      data: rejectedInvoices,
      message: "Rejected invoices fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching rejected invoices",
    });
  }
};

export const uploadInvoice = async (req, res) => {
  try {
    const files = req.files;
    const jobs = [];
    const invoices = [];
    for (const file of files) {
      const invoice = await Invoice.create({
        fileName: file.originalname,
      });
      const job = await invoiceQueue.add(
        "process-invoice",
        {
          filepath: file.path,
          fileMimeType: file.mimetype,
          invoiceId: invoice._id,
        },
        {
          attempts: 3,
          backoff: {
            type: "fixed",
            delay: 1000,
          },
        }
      );
      jobs.push(job.id);
      invoices.push(invoice);
    }

    return res.status(200).json({
      success: true,
      data: {
        jobs,
        invoices,
      },
      message: "Invoice uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error uploading invoice",
    });
  }
};


export const getUploadsForHumanReview = async (req , res , next) => {
  
   try {

         const data = await Invoice.find();
         res.status(200).json(
          {
            status : "Success" ,
            data
          }
         )

   }
   catch(err) {

        res.status(500).json(
          {
            status : "Failed" ,
            error : err
          }
        )

   }

}


export const UpdateInvoiceById = async (req , res , next) => {

         try {

         const data = await Invoice.findByIdAndUpdate(req.params.id , req.body);
         res.status(200).json(
          {
            status : "Success" ,
            data ,
            message : "Invoice Updated Successfully"
          }
         )

   }
   catch(err) {

        res.status(500).json(
          {
            status : "Failed" ,
            error : err
          }
        )

   }

}


export const getAllRejectedInvoices = async (req , res , next) => {
  
   try {

         const data = await Invoice.find( { "reject.rejected" : true } );
         res.status(200).json(
          {
            status : "Success" ,
            data
          }
         )

   }
   catch(err) {

        res.status(500).json(
          {
            status : "Failed" ,
            error : err
          }
        )

   }

}

