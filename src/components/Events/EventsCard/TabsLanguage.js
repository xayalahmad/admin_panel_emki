import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from 'react';
import PostPutModal200 from './PostPutModal200';
import PostPutModal400 from './PostPutModal400';

export default function TabsLanguage({ getlang, setGetLang, event }) {
    const [value, setValue] = useState('3');
    const [annDataLang, setAnnDataLang] = useState('')
    const [choosenLanguage, setChoosenLanguage] = useState();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function getLanguageAnn(id) {
        setChoosenLanguage(id)
        // console.log(event);
        // console.log(event.id);
        // console.log(id);
        fetch(`http://logicbackend-001-site1.htempurl.com/api/AnnouncementTranslation?announcementId=${event.id}&languageId=${id}`)
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
                console.log(err)
                console.log('catch');
                setAnnDataLang({
                    title: '',
                    artist: '',
                    desc: '',
                    hall: '',
                    link: '',

                })

            })
    }


    return (
        <Box>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            {getlang.map((q, i) =>

                                <Tab onClick={() => getLanguageAnn(q.id)} label={q.code} value={q.id} />
                            )}
                            {/* <Tab label="Item Two" value="2" /> */}
                            {/* <Tab label="Item Three" value="3" /> */}
                        </TabList>
                    </Box>
                    {getlang.map((q, i) =>
                        <TabPanel value={q.id}>
                            {annDataLang ?
                                <PostPutModal200 announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} language={q} />

                                :
                                <PostPutModal400 announcementId={event.id} choosenLanguage={choosenLanguage} event={event} language={q} />
                            }
                        </TabPanel>

                    )}
                    {/* <TabPanel value="2">Item Two</TabPanel> */}
                    {/* <TabPanel value="3">Item Three</TabPanel> */}
                </TabContext>
            </Box>
        </Box>
    );
}