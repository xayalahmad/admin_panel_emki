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
import AnnModal from './AnnModalBlog';
import styles from './EventsCard.module.css'
import ModalTranslations from './ModalTranslations';
export default function EventsCard({event, setAllEvent, setEventContainer, eventContainer, setGetEvent, getEvent}) {
  const Token = localStorage.getItem("Token");
  const [get, setGetLang] = useState([]);
  const theme = useTheme();
const deleteEvent = (id) => {
    fetch(`https://emkiproduction.azurewebsites.net/api/Post/${id}`,  {
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
    <Card sx={{ display: 'flex', margin: '15px', width: '450px', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '450px' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box className='flex-col justify-between items-end h-full '>
          <Box className='mb-2'>

        
          <Box className='flex justify-between'>


          <Typography component="div" variant="h5">
            {event.translations[0]?.title} 
          </Typography>
               <DeleteIcon onClick={() => deleteEvent(`${event.id}`) }/>
          </Box>
          <Typography  variant="subtitle1" color="text.secondary" component="div">
          {event.translations[0]?.content.split(' ').length > 23 ? `${event.translations[0]?.content.split('').splice(0,23).join('')} ...`  : event.translations[0]?.content}
          </Typography>
          <Typography  variant="subtitle1" color="text.secondary" component="div">
          {event.date.split('T')[0]}
          </Typography>
          </Box>
{/* <EditModal /> */}
{/* <EventsModal eventContainer={eventContainer} setEventContainer={setEventContainer} announcementId={event.id} id={event.translations[0]?.id} artistName={event.translations[0]?.artistName}/> */}
           <Box className=''>
            <AnnModal eventContainer={eventContainer} setEventContainer={setEventContainer} announcementId={event.id} id={event.translations[0]?.id} artistName={event.translations[0]?.artistName} event={event}/>

<ModalTranslations setEventContainer={setEventContainer} event={event}/>
           </Box>
           </Box>

        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 450, height: 220 }}
        image={event.translations[0]?.imageSrc}
        alt={event.translations[0]?.title}
      />
    </Card>
  );
}