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

function AnnModal({event, setEventContainer}) {
    const dispatch = useDispatch()
    const { tokenBoolean } = useSelector(state => state.tokenBoolean)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [err, setErr] = useState('');
    

    const [announcementId, setAnnouncementId] = useState('')
    const Token = localStorage.getItem("Token");
    const [value, setValue] = useState(dayjs('2022-04-17T18:00'));
    const [eventsDate, setEventsDate] = useState('')
    const [getLang, setGetLang] = useState('')
    const [langAnn, setLangAnn] = useState('');
    const [inputVal, setInputVal] = useState('');
    const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
        initialValues: {
            minPrice: event.minPrice,
            maxPrice: event.maxPrice,
            time: event.hours,
            date: event.date,
            id: event.id
        },
        onSubmit: values => {
            setInputVal(values)
            postAnn(values)
            // putTrans(values, id)

        }
    })
  
   const postAnn = useCallback(dataVal => {
    const annData = {
        date: moment(dataVal.date).add(1, 'days'),
        id: event.id
    }
  if(annData.date && annData.id){       
    setOpen(false)
    fetch(`https://emkiproduction.azurewebsites.net/api/Post/${event.id}`, {
        method: 'PUT',
        body: JSON.stringify(annData),
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + Token
        }
    })
        .then(res => res.json())
        .then(data => {
            setAnnouncementId(data.id)
            // postTrans(dataVal, data.id)
            dispatch(setTokenBoolean(true))
            setEventContainer(oldArray => [...oldArray, data])

            
        })
        .catch(err => {
            setErr(err)
        })
    }
    else{
        toast.error("Bütün xanaları doldurun", {
          position: toast.POSITION.TOP_CENTER
        });
      }
})






    return (
        <>
            <Box className='flex items-center w-full'>
                {/* <Box> */}
            <Box  onClick={handleOpen} className={styles.button1}>
                Ümumi məlumatlar
            </Box>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                        {/* <Box className={styles.box}> */}
                    <Box className={styles.text}> Bloq dəyişimi</Box>

                            <form onSubmit={handleSubmit}>
                                <Box className='md:flex block'>
                                        {/* <TextField className='w-full m-6'
                                    value={values.date}
                                    onChange={handleChange}
                                    id='date'
                                    sx={{
                                        input: {
                                            color: '#151A30',
                                            // background: "green"
                                        }
                                    }}
                                    label="Tarix" variant="filled" /> */}
                                        <DatePicker
                                            selected={values.startDate}
                                            //   dateFormat="dd/mm/yyyy"
                                            className={`form-control w-full ${styles.dateInput}`}
                                            name="startDate"
                                            //   onChange={date => setFieldValue('date', date)}
                                            onChange={date => {
                                                setFieldValue('date', date)
                                            }}
                                        />
                               
                                </Box>

                    
            
                                <button className="w-full mt-2" type="submit">
                                    <Box className={styles.addButton}>
                                        Əlavə et
                                    </Box>

                                </button>
                            </form>
                        {/* </Box> */}
                        </Box>
                    </Modal>
                {/* </Box> */}
            </Box>
        </>
    )
}

export default memo(AnnModal)