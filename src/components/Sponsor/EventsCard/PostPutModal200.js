import { Box, Button, FormControl, InputLabel, Select, TextField } from "@mui/material";
import { useFormik, Formik, Form, Field } from "formik";
import MenuItem from '@mui/material/MenuItem';
import styles from "./EventsCard.module.css";
import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useState } from "react";
import ButtonGroup from '@mui/material/ButtonGroup';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { memo } from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Modal from '@mui/material/Modal';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setTokenBoolean } from "../../../stores/tokenBoolean";
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
// import TimePickerValue from "../TimePicker/TimePicker";
// import FormikFieldDateTimePicker from "../FormikFieldDateTimePicker/FormikFieldDateTimePicker";

function PostPutModal({ setOpen, formValues, annDataLang, artistName, id, announcementId, setEventContainer, eventContainer, choosenLanguage, sponsor}) {
    const dispatch = useDispatch()
    const { tokenBoolean } = useSelector(state => state.tokenBoolean)
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    
    // const [announcementId, setAnnouncementId] = useState('')
    const Token = localStorage.getItem("Token");
    const [value, setValue] = useState(dayjs('2022-04-17T18:00'));
    const [eventsDate, setEventsDate] = useState('')
    const [getLang, setGetLang] = useState('')
    const [err, setErr] = useState('');
    const [langAnn, setLangAnn] = useState('');
    const [inputVal, setInputVal] = useState('');

  
    const { handleSubmit, handleChange, values, setFieldValue,  resetForm } = useFormik({
        initialValues: {
            id: sponsor.id

        },
        onSubmit: values => {
            setInputVal(values)
            // postAnn(values)
            putTrans(values)
        }
    })
  
    const putTrans = useCallback((data, id) => {
        const annData = {
            imageFile: data.imageFile,
        }
        const formDataPut = new FormData();
        for (const key in annData) {
            if (annData.hasOwnProperty(key)) {
              formDataPut.append(key, annData[key]);
            }
          }
          if(values.imageFile){
    setOpen(false)
        fetch(`https://emkiproduction.azurewebsites.net/api/Sponsor/${data.id}`, {
            method: 'PATCH',
            body: formDataPut,
            headers: {
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${Token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setEventContainer(oldArray => [...oldArray, data])
            })
            .catch(err => {
                setErr(err)
            })
        }
        else{
            toast.error("Şəkil xanasını doldurun", {
              position: toast.POSITION.TOP_CENTER
            });
          }
    })





    return (
        <>
           {/* <ToastContainer /> */}

            <Box className='flex items-center w-full'>
                <Box className='w-full'>

        
                        <Box >
                        {/* <Box className={styles.box}> */}

                            <form onSubmit={handleSubmit}>
                  

                                <Box className='my-2'>
                                    {/* <Button    value={values.image}
                            onChange={handleChange}
                            id='image' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button> */}
                                    <Box className={styles.addImage}>
                                        <input onChange={(event) => {
                                            setFieldValue("imageFile", event.currentTarget.files[0])
                                        }} type="file" name="uploadfile" id="img" style={{ display: 'none' }} />
                                        <label className="w-full inline-block py-3 px-8" for="img" >Şəkil əlavə et</label>
                                    </Box>

                                </Box>

                                <button className="w-full mt-2" type="submit">
                                    <Box className={styles.addButton}>
                                        Əlavə et
                                    </Box>

                                </button>
                            </form>
                        {/* </Box> */}
                        </Box>
                </Box>
            </Box>
        </>
    )
}

export default memo(PostPutModal)