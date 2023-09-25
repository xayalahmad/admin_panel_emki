import { Box, Button, FormControl, InputLabel, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import MenuItem from '@mui/material/MenuItem';
import styles from "./AddLanguage.module.css";
import { styled } from '@mui/material/styles';
import { useCallback, useEffect, useState } from "react";
import ButtonGroup from '@mui/material/ButtonGroup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PostRequest from "../Api/PostRequest/PostRequest";
import { memo } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Login from "../Login/Login";
import EditModal from "./EditModal";
function AddEvent() {
    const Token = localStorage.getItem("Token");
    const [getlang, setGetLang] = useState([]);
    const [allLanguages, setAllLanguages] = useState('');
    const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
        initialValues: {
            title: '',
            code: '',
        },
        onSubmit: values => {
            console.log(values);
            postLang(values)
        }
    })
    // console.log(Token);

    // GET
    // səhifə ilk açılanda get edib dilləri dropdown a gətirmək
    useEffect(() => {
        fetch('http://logicbackend-001-site1.htempurl.com/api/Language')
            .then(res => res.json())
            .then(data => setGetLang(data))
            .catch(err => console.log(err))
    }, [allLanguages])
    // http://logicbackend-001-site1.htempurl.com/
    // POST
    // Yeni elan yaratmaq

    // Post
    // Yeni dil yaratmaq
    const postLang = useCallback((values) => {
        console.log(values);
        fetch('http://logicbackend-001-site1.htempurl.com/api/Language', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + Token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAllLanguages(oldArray => [...oldArray, data])
            })
            .catch(err => console.log(err))
    })
    const deleteLang = (id) => {
        fetch(`http://logicbackend-001-site1.htempurl.com/api/Language/${id}`,  {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + Token
            }
        })
        setGetLang(getlang.filter(languages => languages.id != id))
        // setAllLanguages(allLanguages.filter(languages => languages.id != id))
        console.log(getlang);
        console.log(id);
    }



    return (
        <>
            <Box className='flex items-center w-full'>
                <Box className='md:w-2/5 sm:w-1/2 w-3/4  mx-auto'>
                    {/* <PostRequest  data={values}/> */}
                    <form onSubmit={handleSubmit}>
                        <Box className='md:flex block'>
                            <Box className='md:mr-1 mb-2 md:mb-0 w-full'>
                                <TextField className='w-full m-6'
                                    value={values.title}
                                    onChange={handleChange}
                                    id='title'
                                    sx={{
                                        input: {
                                            color: '#151A30',
                                            // background: "green"
                                        }
                                    }}
                                    label="Dil" variant="filled" />
                            </Box>
                            <Box className='md:ml-1 w-full'>
                                <TextField className='w-full m-6'
                                    value={values.code}
                                    onChange={handleChange}
                                    id='code'
                                    sx={{
                                        input: {
                                            color: '#151A30',
                                            // background: "green"
                                        }
                                    }}
                                    label="Dilin kodu" variant="filled" />
                            </Box>
                        </Box>




                        <button className="w-full mt-2" type="submit">
                            <Box className={styles.addButton}>
                                Əlavə et
                            </Box>

                        </button>
                    </form>
                    <Box className={styles.allLangTitle}>
                        Mövcud dillər:
                    </Box>
                    {getlang.map((q, i) => <Box key={i} className={styles.languages}>
                        <Box>
                            {q.title}
                        </Box>
                        <Box className='flex items-center'>

             <EditModal setGetLang={setGetLang} getlang={getlang} setAllLanguages={setAllLanguages} allLanguages={allLanguages} item={q} />
                            <DeleteIcon className={styles.deleteicon} onClick={() => deleteLang(`${q.id}`) }/>
                        </Box>
                    </Box>)}
                </Box>
                <Box>
                </Box>
            </Box>
        </>
    )
}

export default memo(AddEvent)