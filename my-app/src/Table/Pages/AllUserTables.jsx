// import React from "react";
// import TableData from "../Containers/TableData";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import { autocompleteClasses } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormDialog from "../../User/Components/FormDialog";
import CFFForm from "../../User/Components/CFFForm";
import NavBar from "../../User/Components/NavBar";

import "../TableOverall.css"


function AllUserTables(){

    const [userData,setUserData] = useState([]);
    const [deleteId,setDeleteId]=useState();
    const [updateData,setUpdateData]=useState();
    // const [displayedData,setDisplayedData]=useState();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
      setSearchQuery(event.target.value);
      console.log(event.target.value)
    };


    const DeleteTableData = (id)=>()=>{
      console.log(id);
      setDeleteId(id);//make fetch call to delete from backend
      setUserData((prevUserData)=>
      prevUserData.filter(
        (user)=>user.OrderId!==id))
    }

    //handle the table data update
    const handleCellEdit = (params) => {
        const {field,id,value} = params
        console.log(params);

        setUpdateData([field,id,value]);//make fetch call to do the update
    //   fetch(`api/updateUserData?id=${id}&field=${field}&value=${value}`)
    // .then((response) => response.json())
    // .then((data) => console.log(data))
    // .catch((error) => console.log(error));
        
      setUserData((prevUserData) =>
      prevUserData.map((user) =>
        user.OrderId === id ? { ...user, [field]: value } : user
      )
    );
    console.log(userData);
    }

    //filter functionalities in the table
    const filteredRows = userData.filter(
      (row) =>
      row.Address1Billing?.toLowerCase().includes(searchQuery?.toLowerCase()) || row.CustomerNote?.toLowerCase().includes(searchQuery?.toLowerCase()) || row.OrderNumber?.toString().includes(searchQuery?.toString())
      || row.OrderDate?.toString().includes(searchQuery?.toString())
      || row.ZipBilling?.toString().includes(searchQuery?.toString())
      ||row.StateCodeShipping?.toString().includes(searchQuery?.toString())
      ||row.ZipShipping?.toString().includes(searchQuery?.toString())
      ||row.Quantity?.toString().includes(searchQuery?.toString())
      ||row.TotalItems?.toString().includes(searchQuery?.toString())
      ||row.Phone?.toString().includes(searchQuery?.toString())
      || row.FirstName?.toLowerCase().includes(searchQuery?.toLowerCase())
      ||row.LastName?.toLowerCase().includes(searchQuery?.toLowerCase())
      ||row.City?.toLowerCase().includes(searchQuery?.toLowerCase())
      ||row.StateBilling?.toLowerCase().includes(searchQuery?.toLowerCase())
      ||row.Email?.toLowerCase().includes(searchQuery?.toLowerCase())
      ||row.AddressShipping?.toLowerCase().includes(searchQuery?.toLowerCase())
      ||row.CityShipping?.toLowerCase().includes(searchQuery?.toLowerCase())
      ||row.StateShipping?.toLowerCase().includes(searchQuery?.toLowerCase())
      ||row.Name?.toLowerCase().includes(searchQuery?.toLowerCase())
      ||row.DedicatedFrom?.toLowerCase().includes(searchQuery?.toLowerCase())
      ||row.DedicatedTo?.toLowerCase().includes(searchQuery?.toLowerCase())
      ||row.SKU?.toLowerCase().includes(searchQuery?.toLowerCase())
      ||row.OrderStatus?.toLowerCase().includes(searchQuery?.toLowerCase())
      ||row.OrderStatus?.toLowerCase().includes(searchQuery?.toLowerCase())
    );


    useEffect(() =>{
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/cff/');
          const json = await response.json();
          console.log(json);
          setUserData(json.allCFF);
        } catch (error) {
          console.log('Error fetching data', error);
        }
      };

      fetchData();
    },[])



    const columns = [
        { field: "OrderNumber", headerName: "Order Number", width: 120, editable: false},
        { field: "OrderStatus", headerName: "Order Status", width: 120, editable: true },
        { field: "FirstName", headerName: "Name", width: 120, editable: true },
        { field: "LastName", headerName: "SurName", width: 120, editable: true },
        { field: "AddressBilling", headerName: "Billing Address", width: 250, editable: true },
        { field: "City", headerName: "Billing City", width: 120, editable: true },
        { field: "State", headerName: "Billing State", width: 120, editable: true },
        { field: "ZipCode", headerName: "Zip Code", width: 120, editable: true },
        { field: "Email", headerName: "Email", width: 250, editable: true },
        { field: "Phone", headerName: "Phone", width: 120, editable: true },
        { field: "Item", headerName: "Item", width: 100, editable: true },
        { field: "SKU", headerName: "SKU", width: 200, editable: true },
        { field: "ServiceType", headerName: "Service Type", width: 450, editable: true },
        { field: "AddressShipping", headerName: "Shipping Address", width: 250, editable: true },
        { field: "CityShipping", headerName: "Shipping City", width: 120, editable: true },
        { field: "StateShipping", headerName: "Shipping State", width: 120, editable: true },
        { field: "StateCodeShipping", headerName: "Shipping ZipCode", width: 150, editable: true },
        { field: "ZipShipping", headerName: "Shipping Zip", width: 120, editable: true },
        { field: "Name", headerName: "Flag Name", width: 200, editable: true },
        { field: "Quantity", headerName: "Quantity", width: 120, editable: true },
        { field: "TotalItems", headerName: "Total Items", width: 120, editable: true },
        { field: "CustomerNote", headerName: "In memory of", width: 350, editable: true },
        { field: "DedicatedFrom", headerName: "Dedicated From", width: 400, editable: true },
        { field: "DedicatedTo", headerName: "Dedicated To", width: 400, editable: true },      
        {field:"Delete",headerName:"Delete",width:300,editable:true,renderCell:(params)=>
        <div style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem"
        }}>
          <Button variant="contained" size="small">
            Print
          </Button>
          <Button variant="outlined" color="error" size="small" onClick={DeleteTableData(params.row.OrderId)}>
            Delete
          </Button>
          <Button variant="outlined" color="success" size="small" >
            Edit
          </Button>
        </div>
    }
      ];
   

    return (
    // 
    <div>
      <div>
      <NavBar />
      </div>
        <div style={{
          display : "flex",
          flexDirection: "row",
          justifyContent: "left",
          marginTop: "8rem",
          marginLeft: "1rem",
          gap: "5rem"

        }}>
            {/* <h3>Search</h3> */}
            <TextField 
              type="text" 
              onChange={handleSearch}
              label="Search"
              style={{
                fontSize: '14px',
                width: '40rem',
                height: '2rem'
              }}
            />

            <FormDialog />
            <CFFForm />
          </div>
          <div style={{ marginTop: "3rem", height: "100vh", width: '100%' }}>
        {<DataGrid
          rows={filteredRows}
          density='standard'
          checkboxSelection
          getRowId={(row) => row._id}
          columns={columns}
          rowsPerPageOptions={[7]}
          onCellEditCommit={handleCellEdit}
        /> }
        </div>
      </div>
    )
}

export default AllUserTables;