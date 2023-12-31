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
import { ToastContainer, toast } from "react-toastify";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 512,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
// import TimePickerValue from "../TimePicker/TimePicker";
// import FormikFieldDateTimePicker from "../FormikFieldDateTimePicker/FormikFieldDateTimePicker";

function AddEvent({setEventContainer}) {
    const dispatch = useDispatch()

    const { tokenBoolean } = useSelector(state => state.tokenBoolean)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [announcementId, setAnnouncementId] = useState('')
    const Token = localStorage.getItem("Token");
    const [value, setValue] = useState(dayjs('2022-04-17T18:00'));
    const [eventsDate, setEventsDate] = useState('')
    const [langAnn, setLangAnn] = useState('');
    const [inputVal, setInputVal] = useState('');
    const [err, setErr] = useState('');

    const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
        initialValues: {
            title: '',
            content: '',
            // artist: '',
            // minPrice: '',
            // maxPrice: '',
            // date: '',
            // hall: '',
            // link: '',
            // time: ''
        },
        onSubmit: values => {
            setInputVal(values)
            postAnn(values)

        }
    })
    // GET
    // səhifə ilk açılanda get edib dilləri dropdown a gətirmək
    useEffect(() => {
        fetch('https://emkiproduction.azurewebsites.net/api/Language')
            .then(res => res.json())
            .then(data => {
                setLangAnn(data)
                dispatch(setTokenBoolean(true))
            })
            .catch(err => {
                dispatch(setTokenBoolean(true))
            })
    }, [])
    // http://logicbackend-001-site1.htempurl.com/
    // POST
    // Yeni elan yaratmaq
    const postAnn = useCallback(dataVal => {
        const annData = {
            date: dataVal.date,
        }
        if(annData.date){
    
        fetch('https://emkiproduction.azurewebsites.net/api/Post', {
            method: 'POST',
            body: JSON.stringify(annData),
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + Token
            }
        })
            .then(res => res.json())
            .then(data => {
                setAnnouncementId(data.id)
                postTrans(dataVal, data.id)
                dispatch(setTokenBoolean(true))
                
            })
            .catch(err => {
                dispatch(setTokenBoolean(true))
            })
        }
        else{
            toast.error("Şəkil və digər xanaları doldurun", {
              position: toast.POSITION.TOP_CENTER
            });
          }
    })




    const postTrans = useCallback((data, id) => {
        const annData = {
            title: data.title,
            content: data.content,
            imageFile: data.imageFile,
            postId: id,
            languageId: data.lang,
        }
        const formData = new FormData();
        for (const key in annData) {
            if (annData.hasOwnProperty(key)) {
              formData.append(key, annData[key]);
            }
          }
        if(annData.title && annData.content && annData.imageFile && annData.postId  && annData.languageId){

      

    setOpen(false)
        fetch('https://emkiproduction.azurewebsites.net/api/PostTranslation', {
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
                // dispatch(setTokenBoolean(false))
            })
        }
        else{
            toast.error("Şəkil və digər xanaları doldurun", {
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
                        <Box className='flex-col justify-center text-center items-center bg-primarybg rounded-lg w-52 p-5  mt-5 ml-4'>

                            <AddCircleOutlineOutlinedIcon fontSize="large" className={styles.addEventIcon} />
                            <Box className={styles.newEvent}>Yeni Bloq</Box>
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
                                <Box className='mb-2'>
                                    <TextField className='w-full'
                                        value={values.title}
                                        onChange={handleChange}
                                        id='title'
                                        sx={{
                                            input: {
                                                color: '#151A30',
                                                // background: "green"
                                            }
                                        }}
                                        label="Başlıq" variant="filled"
                                    />
                                </Box>
                                <Box className=''>
                                    <TextField className='w-full'
                                       multiline
                                       rows={2}
                                        value={values.content}
                                        onChange={handleChange}
                                        id='content'
                                        sx={{
                                            input: {
                                                color: '#151A30',
                                                // background: "green"
                                            }
                                        }}
                                        label="Ətraflı" variant="filled"
                                    />
                                </Box>
                       
                                <Box className='md:flex block'>
                                    <Box className='md:mr-1 mb-2 mt-2 md:mb-0 w-full ' style={{ backgroundColor: '#f0f0f0', borderBottom: '1px solid #737373', borderRadius: '4px 4px 0 0', boxSizing: 'border-box' }}>
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
                                 
                                </Box>

                                <Box className='my-2'>
                                    {/* <Button    value={values.image}
                            onChange={handleChange}
                            id='image' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button> */}
                                    <Box className={styles.addImage}>

                                        {/* <input className=" bg-pink text-main" id="image" name="image" type="file" title = "Choose a video please"  onChange={(event) => {
        setFieldValue("image", event.currentTarget.files[0]);
    }}
     /> */}
                                        <input onChange={(event) => {
                                            setFieldValue("imageFile", event.currentTarget.files[0])
                                        }} type="file" name="uploadfile" id="img" style={{ display: 'none' }} />
                                        <label className="w-full inline-block py-3 px-8" for="img" >Şəkil əlavə et</label>
                                    </Box>

                                </Box>


                                <Box className='md:flex block mt-2'>
                                    <Box className='md:ml-1 w-full'>
                                        <TextField className='w-full m-6'
                                            id="filled-select-currency"
                                            select
                                            label="Dil"
                                            defaultValue="AZ"
                                            variant="filled"
                                            onChange={(event) => {
                                                setFieldValue("lang", event.target.value);
                                            }}
                                        >
                                            {Object.entries(langAnn).map((q, i) => {
                                                return (<MenuItem value={q[1].id} id={q[1].id} key={i}>
                                                    {q[1].title}
                                                </MenuItem>)
                                            })}
                                        </TextField>
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