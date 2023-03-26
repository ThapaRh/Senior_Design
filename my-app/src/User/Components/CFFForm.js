import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import "./CFFForm.css";
import Button from "@mui/material/Button";
import * as XLSX from "xlsx";
import axios from "axios";
import ReactModal from "react-modal";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const CFFForm = () => {
  const [jsonExcel, setJsonExcel] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const readExcel = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const headers = rows[0];
        const result = [];

        for (let i = 1; i < rows.length; i++) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = rows[i][j];
          }
          result.push(obj);
        }
        resolve(result);
        setJsonExcel(result);
      };

      reader.onerror = (event) => {
        reject(event);
      };

      reader.readAsBinaryString(file);
    });
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    const data = jsonExcel;

    const response = await fetch("http://localhost:8000/api/cff/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });

    const json = await response.json();

    if (json) {
      alert("File Successfully uploaded!");
    } else {
      alert(response.error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <Button
          variant="contained"
          style={{ height: "3.2rem" }}
          onClick={handleClickOpen}
        >
          Upload File
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To upload a file, please select the appropriate file and click the
              Add order.
            </DialogContentText>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                readExcel(file);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpload}>Upload Order</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CFFForm;
