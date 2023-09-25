import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from "formik";
import EditIcon from '@mui/icons-material/Edit';
import styles from './AddLanguage.module.css'
import { TextField } from '@mui/material';
import { useState } from 'react';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
};

export default function EditModal({item, allLanguages, setAllLanguages, setGetLang}) {
    const Token = localStorage.getItem("Token");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
        initialValues: {
            title: item.title,
            code: item.code,
        },
        onSubmit: values => {
            editLang(values)
        }
    })


    const editLang = (values) => {
        const editData = {
            title: values.title,
            code: values.code,
            id: item.id
        }
        console.log(editData);
        fetch(`http://logicbackend-001-site1.htempurl.com/api/Language/${item.id}`,  {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + Token
            },
            body: JSON.stringify(editData)
        })
        .then(response => response.json())
.then(data => {
    setAllLanguages(oldArray => [...oldArray, data])

})
        setOpen(false)
        fetch('http://logicbackend-001-site1.htempurl.com/api/Language')
        .then(res => res.json())
        .then(data => setGetLang(data))
        .catch(err => console.log(err))
        }

    return (
        <div>
            <EditIcon onClick={handleOpen} className={styles.editicon} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Box className={styles.box}>
                    <Box className={styles.text}>{item.title} dil dəyişimi</Box>
                    <form onSubmit={handleSubmit}>
                        
                    <Box className={styles.adminInput}>
                        <TextField 
                        className='w-full'
                         value={values.title}
                         onChange={handleChange}
                         id="title" label="Dil" variant="filled" /> <br />
                    </Box>
                    <Box className={styles.passInput}>
                        <TextField 
                        className='w-full'

                             value={values.code}
                             onChange={handleChange}
                             id='code'
                             label="Dilin kodu" variant="filled" />
                    </Box>
                    <button className="w-full mt-2" type="submit">

                    <Box className={styles.button}>
                        Yenilə
                    </Box>
                    </button>
                    </form>
                </Box>
                </Box>
            </Modal>
        </div>
    );
}
