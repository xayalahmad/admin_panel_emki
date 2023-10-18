import { Box, TextField } from "@mui/material";
import styles from './Login.module.css'
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import moment from 'moment'
import { useSelector } from 'react-redux';
import { setTokenBoolean } from "../../stores/tokenBoolean";
import { setExpDate } from "../../stores/expDate";
export default function Login() {
  const dispatch = useDispatch()
  const { tokenBoolean } = useSelector(state => state.tokenBoolean)
  const { expDate } = useSelector(state => state.expDate)
    const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: values => {
            postLogin(values)
           
        }
    })

//         Admin123!

// useEffect(() => {
  //  
const postLogin = (values) => {
  const url = "https://emkiproduction.azurewebsites.net/api/Authorization/Login";
  if(values.username && values.password){
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })

    .then(response => {
      return response.json();
    })
    .then(responseData => {
      if(responseData.token){
        let x =  new Date( responseData.expiration)
        let expDate = x.toLocaleString()
        localStorage.setItem("Token", responseData.token);
        localStorage.setItem("aTE", responseData.accessTokenExpiration);
        localStorage.setItem("rTE", responseData.refreshTokenExpiration);
        localStorage.setItem("rToken", responseData.refreshToken);
        dispatch(setExpDate(expDate))
      }
      dispatch(setTokenBoolean(true))
    })
    .catch(error => {
      dispatch(setTokenBoolean(false))
    });
  }
  else{
    toast.error("Ad və parol daxil edin", {
      position: toast.POSITION.TOP_CENTER
    });
  }
    
    }
// }, []);


    return (
        <>
            <ToastContainer />
            <Box className={styles.container}>
                <Box className={styles.box}>
                    <Box className={styles.text}>Admin giriş</Box>
                    <form onSubmit={handleSubmit}>
                        
                    <Box className={styles.adminInput}>
                        <TextField 
                         value={values.username}
                         onChange={handleChange}
                         id="username" label="Admin" variant="filled" /> <br />
                    </Box>
                    <Box className={styles.passInput}>
                        <TextField 
                             value={values.password}
                             onChange={handleChange}
                             id='password'
                             type="password" label="Parol" variant="filled" />
                    </Box>
                    <button  className="w-full mt-2" type="submit">

                    <Box className={styles.button}>
                        Giriş
                    </Box>
                    </button>
                    </form>
                </Box>
            </Box>
        </>
    )
}