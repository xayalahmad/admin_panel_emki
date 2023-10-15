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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Modal from '@mui/material/Modal';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setTokenBoolean } from "../../../stores/tokenBoolean";
import EditIcon from '@mui/icons-material/Edit';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment'
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

function AnnModal({ information, setEventContainer }) {
    const dispatch = useDispatch()
    const { tokenBoolean } = useSelector(state => state.tokenBoolean)
    const [open, setOpen] = useState(false);
    const [err, setErr] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [announcementId, setAnnouncementId] = useState('')
    const Token = localStorage.getItem("Token");
    const [eventsDate, setEventsDate] = useState('')
    const [getLang, setGetLang] = useState('')
    const [langAnn, setLangAnn] = useState('');
    const [inputVal, setInputVal] = useState('');
    const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
        initialValues: {
            minPrice: information.minPrice,
            maxPrice: information.maxPrice,
            time: information.hours,
            date: information.date,
            id: information.id
        },
        onSubmit: values => {
            setInputVal(values)
            postAnn(values)
            // putTrans(values, id)

        }
    })
    // GET
    // səhifə ilk açılanda get edib dilləri dropdown a gətirmək
    useEffect(() => {
        fetch('http://logicbackend-001-site1.htempurl.com/api/Language')
            .then(res => res.json())
            .then(data => {setGetLang(data)
            })
            .catch(err => setErr(err))
    }, [])

    // http://logicbackend-001-site1.htempurl.com/
    // POST
    const postAnn = useCallback(dataVal => {
        const annData = {
            minPrice: dataVal.minPrice,
            maxPrice: dataVal.maxPrice,
            date: moment(dataVal.date).add(1, 'days'),
            hours: dataVal.time,
            id: information.id
        }
        
  if(true){       
    setOpen(false)
        fetch(`http://logicbackend-001-site1.htempurl.com/api/Announcement/${information.id}`, {
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
                dispatch(setTokenBoolean(false))
            })
        }
        else{
            toast.error("Bütün event doldurun", {
              position: toast.POSITION.TOP_CENTER
            });
          }
    })






    return (
        <>
           {/* <ToastContainer /> */}
            <Box className='flex items-center w-full'>
                {/* <Box> */}
                <Box onClick={handleOpen} className={styles.button1}>
                    Ümumi dəyiş
                </Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {/* <Box className={styles.box}> */}
                        <Box className={styles.text}> tədbir dəyişimi</Box>

                        <form onSubmit={handleSubmit}>
                            <Box className='md:flex block'>
                                <Box className='md:mr-1 mb-2 md:mb-0 w-full ' style={{ backgroundColor: '#f0f0f0', borderBottom: '1px solid #737373', borderRadius: '4px 4px 0 0', boxSizing: 'border-box' }}>
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
                                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateField
                                            label="Tarix"
                                            className="p-0"
                                            value='MM/DD/YYYY'
                                            variant="filled"
                                            onChange={date => {
                                                setValue(date)
                                                setFieldValue('date', date)
                                            }}
                                        />
                                    </LocalizationProvider> */}
                                </Box>
                                <Box className='md:ml-1 w-full'>
                                    <TextField className='w-full m-6'
                                        value={values.time}
                                        onChange={handleChange}
                                        id='time'
                                        sx={{
                                            input: {
                                                color: '#151A30',
                                                // background: "green"
                                            }
                                        }}
                                        label="Saat" variant="filled" />
     
                                </Box>
                            </Box>

                            <Box className='md:flex block'>
                                <Box className='md:mr-1 mb-2 md:mb-0 w-full'>
                                    <TextField className='w-full m-6'
                                        value={values.minPrice}
                                        onChange={handleChange}
                                        id='minPrice'
                                        sx={{
                                            input: {
                                                color: '#151A30',
                                                // background: "green"
                                            }
                                        }}
                                        label="Minimum qiymət" variant="filled" />
                                </Box>
                                <Box className='md:ml-1 w-full'>
                                    <TextField className='w-full m-6'
                                        value={values.maxPrice}
                                        onChange={handleChange}
                                        id='maxPrice'
                                        sx={{
                                            input: {
                                                color: '#151A30',
                                                // background: "green"
                                            }
                                        }}
                                        label="Maximum qiymət" variant="filled" />
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
                </Modal>
                {/* </Box> */}
            </Box>
        </>
    )
}

export default memo(AnnModal)