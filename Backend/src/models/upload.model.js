import mongoose, {Schema} from "mongoose";
const UploadSchema = new Schema({
  uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
  
  invoiceId: [{ type: Schema.Types.ObjectId, ref: "Invoice"}],
  
}, { timestamps: true });
