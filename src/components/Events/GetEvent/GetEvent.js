import { Box } from "@mui/material";
import EventsCard from "../EventsCard/EventsCard";
import { useEffect, useState } from "react";

export default function GetEvent({eventContainer, setEventContainer }){
    const [allEvent, setAllEvent] = useState('');
    const [getEvent, setGetEvent] = useState([]);


    // GET
    // səhifə ilk açılanda get edib dilləri dropdown a gətirmək
    useEffect(() => {
        fetch('http://logicbackend-001-site1.htempurl.com/api/Announcement')
            .then(res => res.json())
            .then(data => {setGetEvent(data)
                // console.log(data)
            }
            )
            .catch(err => console.log(err))
    }, [eventContainer])



    return(
        <>
        <Box className='flex flex-wrap justify-between'>

        {getEvent.map((q, i) => 
        <EventsCard getEvent={getEvent} setGetEvent={setGetEvent} eventContainer={eventContainer} setEventContainer={setEventContainer} setAllEvent={setAllEvent} key={i} event={q}/>
        )}
        </Box>
        </>
    )
}