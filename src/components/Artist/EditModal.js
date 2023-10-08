import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from "formik";
import EditIcon from '@mui/icons-material/Edit';
import styles from './AddArtist.module.css'
import { TextField } from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs';
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
            name: item.name,
        },
        onSubmit: values => {
            editLang(values)
            console.log(values);
        }
    })


    const editLang = (values) => {
        console.log(values);
        const editData = {
            name: values.name,
            id: item.id,
            imageFile: values.imageFile,
        }
        console.log(editData);
        const formData = new FormData();
        for (const key in editData) {
            if (editData.hasOwnProperty(key)) {
              formData.append(key, editData[key]);
            }
          }
    setOpen(false)

        fetch(`http://logicbackend-001-site1.htempurl.com/api/Artist/${item.id}`,  {
            method: 'PUT',
            body: formData,
            headers: {
                // 'Content-type': 'application/json',
                'Authorization': 'Bearer ' + Token
            }
        })
        .then(response => response.json())
.then(data => {
    setAllLanguages(oldArray => [...oldArray, data])

})
// .catch(err => console.log(err))

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
                    <Box className={styles.text}>{item.name} Sənətçi dəyişimi</Box>
            
                    <form onSubmit={handleSubmit}>
                            <Box className='md:mr-1 mb-2 md:mb-2 w-full'>
                                <TextField className='w-full m-6'
                                    value={values.name}
                                    onChange={handleChange}
                                    id='name'
                                    sx={{
                                        input: {
                                            color: '#151A30',
                                            // background: "green"
                                        }
                                    }}
                                    label="Sənətçi" variant="filled" />
                            </Box>
                            <Box className={styles.addImage}>
                            <input id="file" name="file" type="file" onChange={(event) => {
    setFieldValue("imageFile", event.currentTarget.files[0]);
}} />
                                    </Box>




                        <button className="w-full mt-2" type="submit">
                            <Box className={styles.addButton}>
                                Əlavə et
                            </Box>

                        </button>
                    </form>
                </Box>
                </Box>
            </Modal>
        </div>
    );
}
