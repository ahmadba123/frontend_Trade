import React, { useState, useEffect, } from 'react'
import Button from "@mui/material/Button";
import SearchInput from "../../components/Searsh"
import "./Home.css"
import axios from "axios";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import Pagination from '../../components/pagination/Pagination';
import AddTrade from '../../components/AddTrade/AddTrade';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
import logo from '../../pic/images-removebg-preview.png'


function Home() {
  const [tradesSearch, setTradesSearch] = useState([]);
  const [countTrade, setCountTrade] = useState([]);
  const [open, setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAllData();

  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    getAllData();

  }, [query]);


  //this function for get all data in Trades
  const getAllData = async () => {
    try {

      await axios
        .get(`http://localhost:3000/?limit=${postsPerPage}&offset=${currentPage}&query=${query}`)
        .then((res) => {
          setTradesSearch(res.data.Trades)
          setCountTrade(res.data.countTrade[0]["COUNT(Deal)"])
          // console.log(res.data.countTrade[0]["COUNT(Deal)"])
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };
  //this function for format time Trade
  const FormatCellDate = (e) => {
    return (<td>{moment(e.dataItem[e.field]).format('DD-MM-yyyy')}</td>);
  }
  //this for function remove token
  const logout = () => {
    localStorage.removeItem("token");
    navigate('/')
  }
  // this function for input search to filter by (Symbol,Deal,Login)
  const setInputsearch = (value) => {
    setQuery(value);
    setCurrentPage(1);
    // getAllData();
  }

  //this function for add new Trade
  const addNewTrade = async (value) => {
    setOpen(true)
    try {
      let data = value;
      console.log(data)
      await axios
        .post(`http://localhost:3000`, data)
        .then((res) => {
          const Trades = res.data.Trades;
          getAllData();
          console.log("Trades:", Trades)
          Swal.fire({
            title: `done`,
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "Ok",
            confirmButtonColor: "#455CC7",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
            timer: 5000,
          });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: `error`,
        showConfirmButton: true,
        confirmButtonText: "Ok",
        confirmButtonColor: "#455CC7",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
        timer: 3000,
      });
      console.log(e);
    }
  }

  return (
    <div className='container_Home'>
      {/* part header */}
      <div className='header_home'>
        <div className='logo'>
          <img src={logo} alt="logo" width={180} className="logoNavBar" />
        </div>
        <div className='seconde_part' >
          <Button
          className='buttonAdd'
            onClick={addNewTrade}
          >
            + new trade
          </Button>

          <div className='Search'>
            <SearchInput
              onChange={(event) => { setInputsearch(event.target.value) }}
            />
          </div>
          <FiLogOut
            size={40}
            color="#455CC7"
            onClick={logout}
            className="logout"
          />
        </div>
      </div>
      {/* part table */}
      <div className='table_Trade'>
        <Grid className='tabledrivergrid'
          data={tradesSearch} >
          <GridColumn field="Deal" title=" Deal" width="138.8px" className='fieldTable' />
          <GridColumn field="Login" title=" Login" width="138.8px" className='fieldTable ' />
          <GridColumn field="Action" title="Action" width="138.8px" className='fieldTable' />
          <GridColumn field="Entry" title="Entry" width="138.8px" className='fieldTable' />
          <GridColumn field="Symbol" title="Symbol" width="140.8px" className='fieldTable' />
          <GridColumn field="Price" title="Price" width="138.8px" className='fieldTable' />
          <GridColumn field="Profit" title="Profit" width="138.8px" className='fieldTable' />
          <GridColumn field="Volume" title="Volume" width="138.8px" className='fieldTable' />
          <GridColumn field="Time"
            filter="Time"
            cell={FormatCellDate}
            title="Time" width="176.8px" className='fieldTable' />
        </Grid>
      </div>
      {/* part Pagination */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={countTrade}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
      {/* part add new trade */}
      {open && <AddTrade
        handleClose={() => setOpen(false)}
        addNewTrade={addNewTrade}
        open={open}
      />}
    </div>

  )
}

export default Home
