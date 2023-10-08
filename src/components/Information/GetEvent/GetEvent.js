import { Box } from "@mui/material";
import EventsCard from "../EventsCard/EventsCard";
import { useEffect, useState } from "react";
import styles from '../EventsCard/EventsCard.module.css'
export default function GetEvent({ eventContainer, setEventContainer }) {
    const [allEvent, setAllEvent] = useState('');
    const [getEvent, setGetEvent] = useState([]);


    // GET
    // səhifə ilk açılanda get edib dilləri dropdown a gətirmək
    useEffect(() => {
        fetch('http://logicbackend-001-site1.htempurl.com/api/About')
            .then(res => res.json())
            .then(data => {
                setGetEvent(data[0])
                // console.log(data)
            }
            )
            .catch(err => console.log(err))
    }, [eventContainer])

    console.log(getEvent);

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