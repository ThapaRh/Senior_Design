const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CFFSchema = new Schema(
  {
    OrderNumber: {
      type: Number,
      required: true,
    },
    OrderStatus: {
      type: String,
      required: false,
    },
    OrderDate: {
      type: String,
      required: true,
    },
    CustomerNote: {
      type: String,
      required: false,
    },
    OrderNote: {
      type: String,
      required: false,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    AddressBilling: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    },
    ZipCode: {
      type: Number,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Phone: {
      type: Number,
      required: true,
    },
    ShippingAddress: {
      type: String,
      required: false,
    },
    ShippingCity: {
      type: String,
      required: false,
    },
    ShippingState: {
      type: String,
      required: false,
    },
    ShippingZip: {
      type: Number,
      required: false,
    },
    Item: {
      type: Number,
      required: false,
    },
    SKU: {
      type: String,
      required: false,
    },
    ServiceType: {
      type: String,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    TotalItems: {
      type: Number,
      required: true,
    },
    DedicatedFrom: {
      type: String,
      required: true,
    },
    DedicatedTo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CFF", CFFSchema);
