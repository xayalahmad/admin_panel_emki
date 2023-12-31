import { Box, Button, FormControl, InputLabel, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useState } from "react";
import ButtonGroup from '@mui/material/ButtonGroup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { memo } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Login from "../Login/Login";
import EditModal from "./EditModal";
import styles from './AddArtist.module.css'
import ArtistCard from "./ArtistCard";
import { ToastContainer, toast } from "react-toastify";

function AddArtist({setEventContainer}) {
    const Token = localStorage.getItem("Token");
    const [err, setErr] = useState('');
    const [getlang, setGetLang] = useState([]);
    const [allLanguages, setAllLanguages] = useState('');
    const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: values => {
            postLang(values)
        }
    })

    // GET
    // səhifə ilk açılanda get edib dilləri dropdown a gətirmək
    useEffect(() => {
        fetch('https://emkiproduction.azurewebsites.net/api/Artist')
            .then(res => res.json())
            .then(data => {setGetLang(data)
            })
            .catch(err => setErr(err))
    }, [allLanguages])
    // http://logicbackend-001-site1.htempurl.com/
    // POST
    // Yeni elan yaratmaq

    // Post
    // Yeni dil yaratmaq
    const postLang = useCallback((data) => {
        const annData = {
            name: data.name,
            imageFile: data.imageFile,
        }
  if(annData.name && annData.imageFile){       

        const formData = new FormData();
        for (const key in annData) {
            if (annData.hasOwnProperty(key)) {
              formData.append(key, annData[key]);
            }
          }
        fetch('https://emkiproduction.azurewebsites.net/api/Artist', {
            method: 'POST',
            body: formData,
            headers: {
                // 'Content-type': 'application/json',
                'Authorization': 'Bearer ' + Token
            }
        })
            .then(res => res.json())
            .then(data => {
                setAllLanguages(oldArray => [...oldArray, data])
            })
            .catch(err => setErr(err))
        }
        else{
            toast.error("Şəkil və digər xanaları doldurun", {
              position: toast.POSITION.TOP_CENTER
            });
          }
    })
    const deleteLang = (id) => {
        fetch(`https://emkiproduction.azurewebsites.net/api/Artist/${id}`,  {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + Token
            }
        })
        setGetLang(getlang.filter(languages => languages.id != id))
        // setAllLanguages(allLanguages.filter(languages => languages.id != id))
    }



    return (
        <>
           <ToastContainer />

            <Box className='flex items-center w-full '>
                <Box className='m-4 mt-5 w-full'>
                    <form onSubmit={handleSubmit}>
                        <Box className='w-96'>
                            <Box className='md:mr-1 mb-2 md:mb-0 w-full'>
                                <TextField className='w-1/2 m-6 w-full'
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
                            <Box className={`${styles.addImage} w-96`}>

                                
<input onChange={(event) => {
    setFieldValue("imageFile", event.currentTarget.files[0])
}} type="file" name="uploadfile" id="img" style={{ display: 'none' }} />
<label className="w-96 inline-block py-3 px-8" htmlFor="img" >Şəkil əlavə et</label>
</Box>
                        </Box>




                        <button className="w-96 mt-2" type="submit">
                            <Box className={styles.addButton}>
                                Əlavə et
                            </Box>

                        </button>
                    </form>
                    <Box className={styles.allLangTitle}>
                        Mövcud sənətçilər:
                    </Box>
                    <Box className='flex w-full justify-between flex-wrap'>
                    {getlang.reverse().map((q, i) => 
                    <ArtistCard setEventContainer={setEventContainer} setGetLang={setGetLang} getlang={getlang} setAllLanguages={setAllLanguages} allLanguages={allLanguages} key={i} artist={q}/>
                    )}
                </Box>
                </Box>
                <Box>
                </Box>
            </Box>
        </>
    )
}


export default memo(AddArtist)