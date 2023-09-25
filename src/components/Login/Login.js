import { Box, TextField } from "@mui/material";
import styles from './Login.module.css'
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setTokenBoolean } from "../../stores/tokenBoolean";
export default function Login() {
  const dispatch = useDispatch()
  const { tokenBoolean } = useSelector(state => state.tokenBoolean)
    const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: values => {
            console.log(values);
            postLogin(values)
           
            // fetch('http://localhost:88/api/Authorization/Login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //       },
            //       body: JSON.stringify(values)
      
            // })
            //     .then(res => res.json())
            //     .then(data => console.log(data))
            //     .catch(err => console.log(err))
        }
    })

//         Admin123!

// useEffect(() => {
  //  
const postLogin = (values) => {
  const url = "http://logicbackend-001-site1.htempurl.com/api/Authorization/Login";
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
      console.log(responseData);
      if(responseData.token){
        localStorage.setItem("Token", responseData.token);
      }
      dispatch(setTokenBoolean(true))
    })
    .catch(error => {
      dispatch(setTokenBoolean(false))
      console.error(error);
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