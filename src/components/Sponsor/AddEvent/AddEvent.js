import { Box, Button, FormControl, InputLabel, Select, TextField } from "@mui/material";
import { useFormik, Formik, Form, Field } from "formik";
import MenuItem from '@mui/material/MenuItem';
import styles from "./AddEvent.module.css";
import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useState } from "react";
import ButtonGroup from '@mui/material/ButtonGroup';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { memo } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Modal from '@mui/material/Modal';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setTokenBoolean } from "../../../stores/tokenBoolean";
import { DateField } from '@mui/x-date-pickers/DateField';
import moment from 'moment'
import { ToastContainer, toast } from "react-toastify";

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

function AddEvent({ setEventContainer }) {
    const dispatch = useDispatch()

    const { tokenBoolean } = useSelector(state => state.tokenBoolean)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [err, setErr] = useState('');


    const [announcementId, setAnnouncementId] = useState('')
    const Token = localStorage.getItem("Token");
    const [value, setValue] = useState(dayjs('2023-01-01T18:00'));
    const [eventsDate, setEventsDate] = useState('')
    const [langAnn, setLangAnn] = useState('');
    const [inputVal, setInputVal] = useState('');
    const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
        initialValues: {
        },
        onSubmit: values => {
            setInputVal(values)
            postTrans(values)

        }
    })
    // GET
    // səhifə ilk açılanda get edib dilləri dropdown a gətirmək

    // http://logicbackend-001-site1.htempurl.com/
    // POST
    // Yeni elan yaratmaq




    const postTrans = useCallback((data, id) => {
        const annData = {
            imageFile: data.imageFile,
        }
        const formData = new FormData();
        for (const key in annData) {
            if (annData.hasOwnProperty(key)) {
                formData.append(key, annData[key]);
            }
        }
        if(annData.imageFile){
      

        setOpen(false)

        fetch('http://logicbackend-001-site1.htempurl.com/api/Sponsor', {
            method: 'POST',
            body: formData,
            headers: {
                // "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${Token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch(setTokenBoolean(true))
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
           <ToastContainer />

            <Box className='flex items-center w-full'>
                <Box className=''>
                    <Box onClick={handleOpen}>
                        <Box className='flex-col justify-center text-center items-center bg-primarybg rounded-lg w-52 p-5 mt-5 ml-4'>

                            <AddCircleOutlineOutlinedIcon fontSize="large" className={styles.addEventIcon} />
                            <Box className={styles.newEvent}>Yeni Sponsor</Box>
                        </Box>
                    </Box>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
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
                        </Box>
                    </Modal>
                </Box>
            </Box>
        </>
    )
}

export default memo(AddEvent)