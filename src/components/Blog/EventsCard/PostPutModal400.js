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
import Login from "../../Login/Login";

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

function PostPutModal({ setOpen, artistName, id, announcementId, setEventContainer, eventContainer, choosenLanguage, event}) {
    const dispatch = useDispatch()
    const { tokenBoolean } = useSelector(state => state.tokenBoolean)
    const [err, setErr] = useState('');

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
    let ObjAnnDataLang = {}
        ObjAnnDataLang = {
            title: '',
            artist: '',
            desc: '',
            hall: '',
            link: '',
            id: event.id 
        }


    const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
        initialValues: {
            title: '',
            content: '',
            id: event.id 
        },
        onSubmit: values => {
            setInputVal(values)
            postTrans(values)
        }
    })
    // GET
    // səhifə ilk açılanda get edib dilləri dropdown a gətirmək
    useEffect(() => {
        fetch('http://logicbackend-001-site1.htempurl.com/api/Language')
            .then(res => res.json())
            .then(data => setGetLang(data))
            .catch(err => setErr(err))
    }, [])


    const postTrans = useCallback((data) => {
        const annData = {
            title: data.title,
            // imageName: data.title,
            imageFile: data.imageFile,
            content: data.content,
            postId: announcementId,
            languageId: choosenLanguage,
        }
        const formData = new FormData();
        for (const key in annData) {
            if (annData.hasOwnProperty(key)) {
              formData.append(key, annData[key]);
            }
          }
    setOpen(false)

        fetch('http://logicbackend-001-site1.htempurl.com/api/PostTranslation', {
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
                // setEventContainer(oldArray => [...oldArray, data])
            })
            .catch(err => {
                setErr(err)
                // dispatch(setTokenBoolean(false))
            })
    })




    return (
        <>
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
                    
                                <Box className='my-2'>
                                    <TextField className='w-full'
                                        multiline
                                        rows={2}
                                        // defaultValue="Default Value"
                                        value={values.content}
                                        onChange={handleChange}
                                        id='content'
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