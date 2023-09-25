import { Box } from "@mui/material";
import AddEvent from "./AddEvent/AddEvent";
import EventsCard from "./EventsCard/EventsCard";
import GetEvent from "./GetEvent/GetEvent";
import { useState } from "react";
export default function Events(){
    const [eventContainer, setEventContainer] = useState('')
    return(
        <>
        <Box className='flex-col'>
        <AddEvent eventContainer={eventContainer} setEventContainer={setEventContainer}/>
        <GetEvent eventContainer={eventContainer} setEventContainer={setEventContainer}/>
        </Box>
        </>
    )
}