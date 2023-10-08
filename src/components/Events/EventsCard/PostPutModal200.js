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

function PostPutModal({ setOpen, formValues, annDataLang, artistName, id, announcementId, setEventContainer, eventContainer, choosenLanguage, event}) {
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
    const [langAnn, setLangAnn] = useState('');
    const [inputVal, setInputVal] = useState('');
    const [err, setErr] = useState('');

  
    const { handleSubmit, handleChange, values, setFieldValue,  resetForm } = useFormik({
        initialValues: {
            title: annDataLang.title,
            artistName: annDataLang.artistName,
            description: annDataLang.description,
            place: annDataLang.place,
            ticketLink: annDataLang.ticketLink,
            id: annDataLang.id
        },
        onSubmit: values => {
            setInputVal(values)
            // postAnn(values)
            putTrans(values)

        }
    })
    // GET
    // səhifə ilk açılanda get edib dilləri dropdown a gətirmək
    // useEffect(() => {
    //     fetch('http://logicbackend-001-site1.htempurl.com/api/Language')
    //         .then(res => res.json())
    //         .then(data => setGetLang(data))
    //         .catch(err => console.log(err))
    // }, [])

    // http://logicbackend-001-site1.htempurl.com/
    // POST
    // Yeni elan yaratmaq

    const putTrans = useCallback((data, id) => {
        const annData = {
            title: data.title,
            ticketLink: data.ticketLink,
            artistName: data.artistName,
            place: data.place,
            imageFile: data.imageFile,
            description: data.description,
            announcementId: event.id,
            languageId: choosenLanguage,
            id: data.id
        }
        const formDataPut = new FormData();
        for (const key in annData) {
            if (annData.hasOwnProperty(key)) {
              formDataPut.append(key, annData[key]);
            }
          }
          if(annData.imageFile){
    setOpen(false)
        fetch(`http://logicbackend-001-site1.htempurl.com/api/AnnouncementTranslation/${data.id}`, {
            method: 'PUT',
            body: formDataPut,
            headers: {
                // "Content-Type": "application/json",
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
           {/* <ToastContainer /> */}

            <Box className='flex items-center w-full'>
                <Box className='w-full'>

        
                        <Box >
                        {/* <Box className={styles.box}> */}

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
                                        value={values.artistName}
                                        onChange={handleChange}
                                        id='artistName'
                                        sx={{
                                            input: {
                                                color: '#151A30',
                                                // background: "green"
                                            }
                                        }}
                                        label="Sənətçi" variant="filled"
                                    />
                                </Box>
                                <Box className='my-2'>
                                    <TextField className='w-full'
                                        multiline
                                        rows={2}
                                        // defaultValue="Default Value"
                                        value={values.description}
                                        onChange={handleChange}
                                        id='description'
                                        sx={{
                                            input: {
                                                color: '#151A30',
                                                // background: "green"
                                            }
                                        }}
                                        label="Ətraflı" variant="filled" />
                                </Box>

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


                                <Box className='mt-2'>
                                    <Box className='md:mr-1 mb-2 md:mb-0 w-full'>
                                        <TextField className='w-full m-6'
                                            value={values.place}
                                            onChange={handleChange}
                                            id='place'
                                            sx={{
                                                input: {
                                                    color: '#151A30',
                                                    // background: "green"
                                                }
                                            }}
                                            label="Məkan" variant="filled" />
                                    </Box>
                                 


                                </Box>

                                <Box className='my-2'>
                                    <TextField className='w-full'
                                        value={values.ticketLink}
                                        onChange={handleChange}
                                        id='ticketLink'
                                        sx={{
                                            input: {
                                                color: '#151A30',
                                                // background: "green"
                                            }
                                        }}
                                        label="Link" variant="filled" />
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