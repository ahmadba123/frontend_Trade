import "./LogIn.css"
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./Signup"
import Swal from "sweetalert2";
import logo from '../../pic/images-removebg-preview.png'
import pic from '../../pic/undraw_Predictive_analytics_re_wxt8-removebg-preview (1).png'


import React, { useState } from 'react'
const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false)
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  //this function for login
  const handelLogin = async (e) => {
    var admin = { userName, password }
    axios.post(`http://localhost:3000/users/signin`, admin)
      .then(async res => {
        localStorage.setItem("token", res.data.Token);
        // console.log("token", res.data.Token)
        toast.success("Logged in success")
        navigate("/home")
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          toast.warn(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          toast.error(error.request, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error("Error", error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
  }
  //this function for sginup
  const signup = async (value) => {
    setOpen(true)
    try {
      let data = value;
      console.log(data)
      await axios
        .post(`http://localhost:3000/users/`, data)
        .then((res) => {
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
    <div className=' logniContainer'>
      <ToastContainer />
      {/* part form */}
      <div className='logincontainer1'>
        <div className='loginSubContainer'>
          <div className="logoCintainer">
          </div>
          <div className='headerlogin'>
            <h1 className="headerh1">Time to Work!</h1>
            <p className="headerP">Please enter your details</p>
          </div>
          <div>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '40ch' },
              }}
              noValidate
              autoComplete="off"
              className="boxLogin"
            >
            {/* input user name */}
              <TextField id="outlined-basic"
                label="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            {/* input password */}
              <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password"
                >Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {/* end password */}
                {/* button sginin */}
                <div className="grpBtn">
                <Button variant="contained"
                  className="buttonSubmit"
                  onClick={handelLogin}
                >
                  signin
                </Button>
                <p>OR</p>
                {/* button signup */}
                <Button variant="contained"
                  className="buttonSubmit"
                  onClick={signup}
                >
                  signup
                </Button>
                </div>
              </FormControl>
            </Box>
            {open && <Signup
              handleClose={() => setOpen(false)}
              signup={signup}
              open={open}
            />}
          </div>
        </div>

      </div>
    {/* part 2 */}
      <div className='logincontainer2'>
        <img src={logo}
          alt="pic"
          className="logo"
        />

        <img src={pic}
          alt="pic"
          className="logo"
        />
      </div>
    </div>
  )
}

export default Login