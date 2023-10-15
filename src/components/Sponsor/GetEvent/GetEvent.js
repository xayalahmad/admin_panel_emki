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
        fetch('http://logicbackend-001-site1.htempurl.com/api/Sponsor')
            .then(res => res.json())
            .then(data => {setGetEvent(data)
            }
            )
            .catch(err => setErr(err))
    }, [eventContainer])



    return(
        <>
            <Box className={styles.allEvents}>Mövcud Sponsorlar</Box> 
        <Box className='flex flex-wrap '>

            
        {getEvent.reverse().map((q, i) => 
        <EventsCard  getEvent={getEvent} setGetEvent={setGetEvent} eventContainer={eventContainer} setEventContainer={setEventContainer} setAllEvent={setAllEvent} key={i} sponsor={q}/>
        )}
        </Box>
        </>
    )
}