const express = require("express")
const Upload = require('./../models/upload.model')

exports.getAllUploads = (req , res , next) => {
    
       try {

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


exports.getUploadById = (req , res , next) => {
    
    try {



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