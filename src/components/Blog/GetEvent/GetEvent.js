import { Box } from "@mui/material";
import EventsCard from "../EventsCard/EventsCard";
import { useEffect, useState } from "react";
import styles from '../EventsCard/EventsCard.module.css'
export default function GetEvent({eventContainer, setEventContainer }){
    const [allEvent, setAllEvent] = useState('');
    const [getEvent, setGetEvent] = useState([]);
    const [err, setErr] = useState('');


    // GET
    // səhifə ilk açılanda get edib dilləri dropdown a gətirmək
    useEffect(() => {
        fetch('http://logicbackend-001-site1.htempurl.com/api/Post')
            .then(res => res.json())
            .then(data => {setGetEvent(data.reverse())
            }
            )
            .catch(err => setErr(err))
    }, [eventContainer])



    return(
        <>
            <Box className={styles.allEvents}>Mövcud Tədbirlər</Box> 

        <Box className='flex flex-wrap'>

        {getEvent.map((q, i) => 
        // <Box key={i}>{q.title}</Box>
        <>
        <EventsCard key={i} getEvent={getEvent} setGetEvent={setGetEvent} eventContainer={eventContainer} setEventContainer={setEventContainer} setAllEvent={setAllEvent} event={q}/>
        </>
        )}
        </Box>
        </>
    )
}