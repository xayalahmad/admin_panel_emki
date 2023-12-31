import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from 'react';
import PostPutModal200 from './PostPutModal200';
import PostPutModal400 from './PostPutModal400';
import { memo } from 'react';
import { useCallback } from 'react';

function TabsLanguage({ getlang, setGetLang, event, setOpen, setEventContainer }) {
    const initialFormValues = {
        title: '',
        artistName: '',
        description: '',
        place: '',
        ticketLink: '',
    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const [value, setValue] = useState('3');
    const [annDataLang, setAnnDataLang] = useState('')
    const [choosenLanguage, setChoosenLanguage] = useState();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getLanguageAnn = useCallback((id) => {
        setChoosenLanguage(id)
        fetch(`https://emkiproduction.azurewebsites.net/api/AnnouncementTranslation/translationByLanguageId?announcementId=${event.id}&languageId=${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.imageSrc) {
                    setAnnDataLang(data)
                }
                else {
                    setAnnDataLang(false)

                }
            })
            .catch(err => {
                setAnnDataLang(false)
                setAnnDataLang({
                    title: '',
                    artist: '',
                    desc: '',
                    hall: '',
                    link: '',

                })

            })
    })

    return (
        <Box>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '10px' }}>
                        {/* <TabList onChange={handleChange} aria-label="lab API tabs example"> */}
                        <Box className='flex justify-between'>
                            {getlang.map((q, i) =>
                                <p key={i} className='p-5' onClick={() => getLanguageAnn(q.id)}>{q.code}</p>
                                // <Tab onClick={() => getLanguageAnn(q.id)} label={q.code} value={q.id} />
                            )}
                        </Box>
                        {/* <Tab label="Item Two" value="2" /> */}
                        {/* <Tab label="Item Three" value="3" /> */}
                        {/* </TabList> */}
                    </Box>
                    {/* {annDataLang ?
                        <PostPutModal200 announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        <PostPutModal400 announcementId={event.id} choosenLanguage={choosenLanguage} event={event} />
                    } */}
                    {annDataLang.languageId == 1 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                        {annDataLang.languageId == 2 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                        {annDataLang.languageId == 3 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                        {annDataLang.languageId == 4 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                        {annDataLang.languageId == 5 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                        {annDataLang.languageId == 6 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                        {annDataLang.languageId == 7 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                        {annDataLang.languageId == 8 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                        {annDataLang.languageId == 9 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                        {annDataLang.languageId == 10 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }

                    {annDataLang == false ?
                        // <PostPutModal200 formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />
                        <PostPutModal400 setEventContainer={setEventContainer} setOpen={setOpen} announcementId={event.id} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {/* {annDataLang ?
                        <PostPutModal200 formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        <PostPutModal400 announcementId={event.id} choosenLanguage={choosenLanguage} event={event} />
                    } */}
                    {/* {getlang.map((q, i) =>
                        <TabPanel value={q.id}>
                        </TabPanel>

                    )} */}
                    {/* <TabPanel value="2">Item Two</TabPanel> */}
                    {/* <TabPanel value="3">Item Three</TabPanel> */}
                </TabContext>
            </Box>
        </Box>
    );
}

export default memo(TabsLanguage)