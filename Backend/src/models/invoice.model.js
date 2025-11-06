import mongoose, { Schema } from "mongoose";
const itemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  hsn_sac: String,
  rate: Number,
});
const invoiceSchema = new Schema(
  {
    vendor: {
      name: { type: String },
      address: { type: String },
      taxNumber: { type: String },
      phone: { type: String },
    },
    invoiceDetails: {
      number: { type: String },
      date: { type: String },
      type: { type: String }, // now Mongoose knows invoiceDetails is an object
    },

    items: [itemSchema],
    totalInvoiceValue: Number,
    totalGSTValue: Number,
    status: {
      type: String,
      enum: ["pending", "processed", "rejected"],
      default: "pending",
    },
    error: {
      type: Boolean,
      default: false,
    },
    rejectionReason: {
      type: String,
      default: null,
    },
    fileName: String,
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
