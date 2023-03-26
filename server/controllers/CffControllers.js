const CFF = require("../models/CFFModal");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// HANDLE A FILE UPLOAD
const handleFileUpload = async (req, res, next) => {
  const fileData = req.body.data;

  for (const order of fileData) {
    const [
      OrderNumber,
      OrderStatus,
      OrderDate,
      CustomerNote,
      OrderNote,
      FirstName,
      LastName,
      CompanyBilling,
      AddressBilling,
      City,
      State,
      ZipCode,
      Email,
      Phone,
      ShippingAddress,
      ShippingCity,
      ShippingState,
      ShippingZip,
      Item,
      SKU,
      ServiceType,
      Quantity,
      TotalItems,
      FormattedDedicatedFrom,
      FormattedDedicatedTo,
    ] = [
      order["Order Number"],
      order["Order Status"],
      order["Order Date"],
      order["Customer Note"],
      order["Order Notes"],
      order["First Name"],
      order["Last Name "],
      order["Company (Billing)"],
      order["Address 1 (Billing)"],
      order["City "],
      order["State "],
      order.Zip,
      order["Email "],
      order.Phone,
      order["Address 1 (Shipping)"],
      order["City (Shipping)"],
      order["State Code (Shipping)"],
      order["Zip (Shipping)"],
      order["Item #"],
      order.SKU,
      order.Name,
      order.Quantity,
      order["Total items"],
      order["Dedicated From"],
      order["Dedicated To | In Memory Of"],
    ];
    const DedicatedTo = FormattedDedicatedTo.match(
      /Flag\s*#\s*1\s*-\s*([\s\S]+)/
    )[1];
    const DedicatedFrom = FormattedDedicatedFrom.match(
      /Flag\s*#\s*1\s*-\s*([\s\S]+)/
    )[1];
    const result = await findCFFByOrderNumber(OrderNumber);

    if (!result) {
      for (let i = 0; i < Quantity; i++) {
        try {
          const cff = new CFF({
            OrderNumber,
            OrderStatus,
            OrderDate,
            CustomerNote,
            OrderNote,
            FirstName,
            LastName,
            CompanyBilling,
            AddressBilling,
            City,
            State,
            ZipCode,
            Email,
            Phone,
            ShippingAddress,
            ShippingCity,
            ShippingState,
            ShippingZip,
            Item,
            SKU,
            ServiceType,
            Quantity,
            TotalItems,
            DedicatedFrom,
            DedicatedTo,
          });
          cff.save();
        } catch (error) {
          success = false;
          console.log(error.message);
        }
      }
    }
  }

  res.json({ success: true });
};

// FINDING PREVIOUS CFF BY ORDER NUMBER
async function findCFFByOrderNumber(OrderNo) {
  try {
    const docs = await new Promise((resolve, reject) => {
      CFF.findOne({ OrderNumber: OrderNo }, function (err, docs) {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
    return docs;
  } catch (err) {
    console.log(err);
  }
}

// GETTING A CFF
const getCFF = async (req, res, next) => {
  const id = req.params.id;

  let cff;
  try {
    cff = await CFF.findById(id);
  } catch (err) {
    return next(err);
  }

  res.status(200).json({ cff: cff.toObject({ getters: true }) });
};

// GETTING ALL CFF
const getAllCFF = async (req, res, next) => {
  let allCFF;
  try {
    allCFF = await CFF.find();
    console.log(allCFF);
    res.status(200).json({ allCFF });
  } catch (err) {
    return next(err);
  }
};

// ADDING A CFF
const createCFF = async (req, res) => {
  const cff = new CFF({
    OrderNumber: req.body.OrderNumber,
    OrderStatus: req.body.OrderStatus,
    OrderDate: req.body.OrderDate,
    CustomerNote: req.body.CustomerNote,
    OrderNote: req.body.OrderNote,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    AddressBilling: req.body.AddressBilling,
    City: req.body.City,
    State: req.body.State,
    Zipcode: req.body.ZipCode,
    Email: req.body.Email,
    Phone: req.body.Phone,
    ShippingAddress: req.body.ShippingAddress,
    ShippingState: req.body.ShippingState,
    ShippingZip: req.body.ShippingZip,
    Item: req.body.Item,
    SKU: req.body.SKU,
    ServiceType: req.body.ServiceType,
    Quantity: req.body.Quantity,
    TotalItems: req.body.TotalItems,
    DedicatedFrom: req.body.DedicatedFrom,
    DedicatedTo: req.body.DedicatedTo,
  });
  try {
    await cff.save();
  } catch (err) {
    return next(err);
  }

  return res.status(201).json({ cff });
};

// updating a CFF info
const updateCFF = async (req, res, next) => {
  const newCFF = new CFF({
    OrderNumber: req.body.OrderNumber,
    OrderStatus: req.body.OrderStatus,
    OrderDate: req.body.OrderDate,
    CustomerNote: req.body.CustomerNote,
    OrderNote: req.body.OrderNote,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    AddressBilling: req.body.AddressBilling,
    City: req.body.City,
    State: req.body.State,
    Zipcode: req.body.ZipCode,
    Email: req.body.Email,
    Phone: req.body.Phone,
    ShippingAddress: req.body.ShippingAddress,
    ShippingState: req.body.ShippingState,
    ShippingZip: req.body.ShippingZip,
    Item: req.body.Item,
    SKU: req.body.SKU,
    ServiceType: req.body.ServiceType,
    Quantity: req.body.Quantity,
    TotalItems: req.body.TotalItems,
    DedicatedFrom: req.body.DedicatedFrom,
    DedicatedTo: req.body.DedicatedTo,
  });

  const id = req.params.id;

  let cff;
  try {
    cff = await CFF.findById(id);
  } catch (err) {
    const error = err;
    return next(error);
  }

  // cff.FirstName = FirstName;
  // cff.LastName = LastName;
  // cff.AddressBilling = AddressBilling;
  // cff.City = City;
  // cff.State = State;
  // cff.Client_name = Client_name;
  // cff.Date = Date;
  // cff.Gender = Gender;
  cff = newCFF;

  try {
    await cff.save();
  } catch (err) {
    return next(err);
  }

  res.status(200).json({ cff: cff.toObject({ getters: true }) });
};

// deleting a cff using id
const deleteCFF = async (req, res, next) => {
  const id = req.params.id;
  let cff;
  try {
    cff = await CFF.findById(id);
  } catch (err) {
    return next(err);
  }

  try {
    await cff.remove();
  } catch (err) {
    return next(err);
  }

  res.status(200).json({ message: "Deleted Cff." });
};

module.exports = {
  createCFF,
  getCFF,
  deleteCFF,
  updateCFF,
  handleFileUpload,
  getAllCFF,
};
