import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventsModal from './PostPutModal200';
import { useState } from 'react';
import AnnModal from './AnnModal';
import styles from './EventsCard.module.css'
import ModalTranslations from './ModalTranslations';
export default function EventsCard({event, setAllEvent, setEventContainer, eventContainer, setGetEvent, getEvent}) {
  const Token = localStorage.getItem("Token");
  const [get, setGetLang] = useState([]);
  const theme = useTheme();
  // console.log(event);
const deleteEvent = (id) => {
    console.log(id);
    fetch(`https://emkiproduction.azurewebsites.net/api/Announcement/${id}`,  {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + Token
        }
    })
    setGetEvent(getEvent.filter(languages => languages.id != id))
    // setEventContainer(eventContainer.filter(languages => languages.id != id))
    // setAllLanguages(allLanguages.filter(languages => languages.id != id))
}
  return (
    <Card sx={{ display: 'flex', margin: '15px', width: '500px', height: '270px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '250px', justifyContent: 'space-between'}}>
        <CardContent >
          <Box className='flex-col justify-between  '>
   
          <Box className='flex-col w-full h-36'>
          <Box className='flex justify-between'>
          <Typography component="div" variant="h5">
            {event.translations[0]?.artistName}
          </Typography>
               <DeleteIcon onClick={() => deleteEvent(`${event.id}`) }/>
          </Box>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          {event.translations[0]?.place}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          {event.date.split('T')[0]}
          </Typography>
          </Box>

           <Box className='w-full'>
            <AnnModal eventContainer={eventContainer} setEventContainer={setEventContainer} announcementId={event.id} id={event.translations[0]?.id} artistName={event.translations[0]?.artistName} event={event}/>

<ModalTranslations setEventContainer={setEventContainer} event={event}/>
           </Box>
           </Box>

        </CardContent>
      </Box>
      <CardMedia
        className={styles.eventCardImg}
        component="img"
        sx={{ width: 250 }}
        image={event.translations[0]?.imageSrc}
        alt={event.translations[0]?.artistName}
      />
    </Card>
  );
}