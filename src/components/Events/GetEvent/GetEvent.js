import { Box } from "@mui/material";
import EventsCard from "../EventsCard/EventsCard";
import { useEffect, useState } from "react";
import styles from '../EventsCard/EventsCard.module.css'
export default function GetEvent({eventContainer, setEventContainer }){
    const [allEvent, setAllEvent] = useState('');
    const [getEvent, setGetEvent] = useState([]);


    // GET
    // səhifə ilk açılanda get edib dilləri dropdown a gətirmək
    useEffect(() => {
        fetch('https://emkiproduction.azurewebsites.net/api/Announcement')
            .then(res => res.json())
            .then(data => {setGetEvent(data.reverse())
                // console.log(data)
            }
            )
            .catch(err => console.log(err))
    }, [eventContainer])



    return(
        <>
            <Box className={styles.allEvents}>Mövcud Tədbirlər</Box> 
        <Box className='flex flex-wrap '>

            
        {getEvent.map((q, i) => 
        <EventsCard  getEvent={getEvent} setGetEvent={setGetEvent} eventContainer={eventContainer} setEventContainer={setEventContainer} setAllEvent={setAllEvent} key={i} event={q}/>
        )}
        </Box>
        </>
    )
}