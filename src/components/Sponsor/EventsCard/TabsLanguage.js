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

function TabsLanguage({ getlang, setGetLang, sponsor, setOpen, setEventContainer }) {
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
    const handleChange = (sponsor, newValue) => {
        setValue(newValue);
    };
    const getLanguageAnn = useCallback((id) => {
        setChoosenLanguage(id)
        fetch(`http://logicbackend-001-site1.htempurl.com/api/AnnouncementTranslation/translationByLanguageId?announcementId=${sponsor.id}&languageId=${id}`)
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
                        {/* {getlang.map((q, i) =>
                                <p key={i} className='p-5' onClick={() => getLanguageAnn(q.id)}>{q.code}</p>
                            // <Tab onClick={() => getLanguageAnn(q.id)} label={q.code} value={q.id} />
                        )} */}
                            </Box>
                        {/* <Tab label="Item Two" value="2" /> */}
                        {/* <Tab label="Item Three" value="3" /> */}
                        {/* </TabList> */}
                    </Box>
                    {/* {annDataLang ?
                        <PostPutModal200 announcementId={sponsor.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} sponsor={sponsor} />

                        :
                        <PostPutModal400 announcementId={sponsor.id} choosenLanguage={choosenLanguage} sponsor={sponsor} />
                    } */}
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={sponsor.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} sponsor={sponsor} />
                       
                         
                </TabContext>
            </Box>
        </Box>
    );
}

export default memo(TabsLanguage)