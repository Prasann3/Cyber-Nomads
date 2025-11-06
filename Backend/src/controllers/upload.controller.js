const express = require("express")
import Upload from './../models/upload.model'

exports.getAllUploads = async(req , res , next) => {
    
       try {

         const uploads = await Upload.find().populate({
            path : "invoiceId" ,
            select : "vendor invoiceDetails totalInvoiceValue totalGSTValue status"
         })

         res.status(200).json(
            {
                status : "Success" ,
                data : uploads
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


exports.getUploadById = async (req , res , next) => {
    
    try {

        const uploads = await Upload.findById(req.params.id).populate({
            path : "invoiceId" ,
            select : "vendor invoiceDetails totalInvoiceValue totalGSTValue status"
         })

         res.status(200).json(
            {
                status : "Success" ,
                data : uploads
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