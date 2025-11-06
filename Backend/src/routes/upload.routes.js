const express = require("express")
const uploadController = require('./../controllers/upload.controller')

const router = express.Router();

router.get("upload" , uploadController.getAllUploads)
      .get("upload/:id" , uploadController.getUploadById)