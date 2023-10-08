import AddArtist from "./AddArtist";
import { useState } from "react";

export default function Artist(){
    const [eventContainer, setEventContainer] = useState('')

    return(
        <>
        <AddArtist setEventContainer={setEventContainer}/>
        </>
    )
}