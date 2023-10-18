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

function TabsLanguage({ getlang, setEventContainer, setGetLang, event, setOpen }) {
    const initialFormValues = {
        title: '',
        artistName: '',
        description: '',
        place: '',
        ticketLink: '',
    };
    const [err, setErr] = useState('');
    const [formValues, setFormValues] = useState(initialFormValues);
    const [value, setValue] = useState('3');
    const [annDataLang, setAnnDataLang] = useState('')
    const [choosenLanguage, setChoosenLanguage] = useState();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getLanguageAnn = useCallback((id) => {
        setChoosenLanguage(id)
        fetch(`https://emkiproduction.azurewebsites.net/api/PostTranslation?postId=${event.id}&languageId=${id}`)
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
                setErr(err)

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
                    {annDataLang.languageId == 11 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 12 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 13 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 14 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 15 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 16 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 17 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 18 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 19 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 20 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 21 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 22 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }

                    {annDataLang.languageId == 23 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 24 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 25 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }

                    {annDataLang.languageId == 26 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 27 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 28 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }

                    {annDataLang.languageId == 29 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 30 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 31 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }

                    {annDataLang.languageId == 32 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 33 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 34 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }

                    {annDataLang.languageId == 35 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 36 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 37 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }

                    {annDataLang.languageId == 38 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 39 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 40 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }

                    {annDataLang.languageId == 41 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 42 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 43 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }

                    {annDataLang.languageId == 44 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 45 ?
                        <PostPutModal200 setEventContainer={setEventContainer} setOpen={setOpen} formValues={formValues} setAnnDataLang={setAnnDataLang} announcementId={event.id} annDataLang={annDataLang} choosenLanguage={choosenLanguage} event={event} />

                        :
                        ''
                    }
                    {annDataLang.languageId == 46 ?
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