
import ReactModal from "react-modal";
import TextField from "@mui/material/TextField";
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";



export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [orderNumber, setOrderNumber] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [billingCity, setBillingCity] = useState("");
    const [billingState, setBillingState] = useState("");
    const [billingZipCode, setBillingZipCode] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [item, setItem] = useState("");
    const [Gender, setGender] = useState("");
    const [sku, setSKU] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [shippingCity, setShippingCity] = useState("");
    const [shippingState, setShippingState] = useState("");
    const [shippingZipCode, setShippingZipCode] = useState("");
    const [flagName, setFlagName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [totalItems, setTotalItems] = useState("");
    const [inMemoryOf, setInMemoryOf] = useState("");
    const [dedicatedFrom, setdedicatedFrom] = useState("");
    const [dedicatedTo, setdedicatedTo] = useState("");
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/cff/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Add everydata we have on the form here.
          }),
        });
    
        const json = await response.json();
    
        if (json) {
            // call set method to all the data with empty parameter
          setFirstName("");
          setLastName("");
          setBillingAddress("");
          setBillingCity("");
          setBillingState("");
          setBillingZipCode("");
          setGender("");
        }
      };
  
    return (
      <div>
        <Button variant="contained" style={{ height:"3.2rem" }}onClick={handleClickOpen}>
          Add Order
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Order</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a form, please fill out the window with all appropriate
              information.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Order Number *"
              type="number"
              fullWidth
              variant="standard"
              value={orderNumber}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Order Status *"
              type="text"
              fullWidth
              variant="standard"
              value={orderStatus}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="First Name *"
              type="text"
              fullWidth
              variant="standard"
              value={firstName}
            />
            <TextField
              autoFocus
              margin="dense"
              id="lastName"
              label="Last Name *"
              type="text"
              fullWidth
              variant="standard"
              value={lastName}
            />
            <TextField
              autoFocus
              margin="dense"
              id="billingAddress"
              label="Billing Address *"
              type="text"
              fullWidth
              variant="standard"
              value={billingAddress}
            />
            <TextField
              autoFocus
              margin="dense"
              id="billingCity"
              label="Billing City *"
              type="text"
              fullWidth
              variant="standard"
              value={billingCity}
            />
            <TextField
              autoFocus
              margin="dense"
              id="billingState"
              label="Billing State *"
              type="text"
              fullWidth
              variant="standard"
              value={billingState}
            />
            <TextField
              autoFocus
              margin="dense"
              id="ZipCode"
              label="Zip Code"
              type="Number"
              fullWidth
              variant="standard"
              value={billingZipCode}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email *"
              type="text"
              fullWidth
              variant="standard"
              value={email}
            />
            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="Phone"
              type="Number"
              fullWidth
              variant="standard"
              value={phone}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Item *"
              type="Number"
              fullWidth
              variant="standard"
              value={item}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="SKU *"
              type="text"
              fullWidth
              variant="standard"
              value={sku}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Service Type *"
              type="text"
              fullWidth
              variant="standard"
              value={serviceType}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="text"
              fullWidth
              variant="standard"
              value={serviceType}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Shipping Address"
              type="text"
              fullWidth
              variant="standard"
              value={shippingAddress}
            />
            <TextField
              autoFocus
              margin="dense"
              id="shippingCity"
              label="Shipping City"
              type="text"
              fullWidth
              variant="standard"
              value={shippingCity}
            />
            <TextField
              autoFocus
              margin="dense"
              id="shippingState"
              label="Shipping State"
              type="text"
              fullWidth
              variant="standard"
              value={shippingState}
            />
            <TextField
              autoFocus
              margin="dense"
              id="shippingZipCode"
              label="Shipping ZipCode"
              type="number"
              fullWidth
              variant="standard"
              value={shippingZipCode}
            />
            <TextField
              autoFocus
              margin="dense"
              id="flagName"
              label="Flag Name"
              type="text"
              fullWidth
              variant="standard"
              value={flagName}
            />
            <TextField
              autoFocus
              margin="dense"
              id="shippingState"
              label="Quantity *"
              type="number"
              fullWidth
              variant="standard"
              value={quantity}
            />
            <TextField
              autoFocus
              margin="dense"
              id="shippingState"
              label="Total Items *"
              type="number"
              fullWidth
              variant="standard"
              value={totalItems}
            />
            <TextField
              autoFocus
              margin="dense"
              id="shippingState"
              label="In Memory of *"
              type="text"
              fullWidth
              variant="standard"
              value={inMemoryOf}
            />
            <TextField
              autoFocus
              margin="dense"
              id="dedicatedFrom"
              label="Dedicated From *"
              type="text"
              fullWidth
              variant="standard"
              value={dedicatedFrom}
            />
            <TextField
              autoFocus
              margin="dense"
              id="dedicatedTo"
              label="Dedicated To *"
              type="text"
              fullWidth
              variant="standard"
              value={dedicatedTo}
            />
            

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add Order</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }