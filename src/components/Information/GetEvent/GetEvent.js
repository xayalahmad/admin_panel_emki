import { Box } from "@mui/material";
import EventsCard from "../EventsCard/EventsCard";
import { useEffect, useState } from "react";
import styles from '../EventsCard/EventsCard.module.css'
export default function GetEvent({ eventContainer, setEventContainer }) {
    const [allEvent, setAllEvent] = useState('');
    const [getEvent, setGetEvent] = useState([]);
    const [err, setErr] = useState('');


    // GET
    // səhifə ilk açılanda get edib dilləri dropdown a gətirmək
    useEffect(() => {
        fetch('https://emkiproduction.azurewebsites.net/api/About')
            .then(res => res.json())
            .then(data => {
                setGetEvent(data[0])
            }
            )
            .catch(err => setErr(err))
    }, [eventContainer])

    return (
        <>
            <Box className={styles.allEvents}>Mövcud Məlumat</Box>
            {getEvent ?
                <EventsCard getEvent={getEvent} setGetEvent={setGetEvent} eventContainer={eventContainer} setEventContainer={setEventContainer} setAllEvent={setAllEvent} information={getEvent} />

                :
                ''
            }
            {/* <Box className='flex flex-wrap '>

            
        {getEvent.reverse().map((q, i) => 
        )}
        </Box> */}
        </>
    )
}