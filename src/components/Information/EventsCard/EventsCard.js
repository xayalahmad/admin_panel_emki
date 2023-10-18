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
export default function EventsCard({information, setAllEvent, setEventContainer, eventContainer, setGetEvent, getEvent}) {
  const Token = localStorage.getItem("Token");
  const [get, setGetLang] = useState([]);
  const theme = useTheme();
const deleteEvent = (id) => {
    fetch(`https://emkiproduction.azurewebsites.net/api/About/${id}`,  {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + Token
        }
    })
    setGetEvent('')
    // setEventContainer(eventContainer.filter(languages => languages.id != id))
    // setAllLanguages(allLanguages.filter(languages => languages.id != id))
}
  return (
    <Card sx={{ display: 'flex', margin: '15px', width: '900px', height: '470px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '450px', justifyContent: 'space-between'}}>
        <CardContent >
          <Box className='flex-col justify-between  '>
   
          <Box className='flex-col w-full h-36'>
          <Box className='flex justify-between'>
          <Typography component="div" variant="h5">
            {information?.title}
          </Typography>
               <DeleteIcon onClick={() => deleteEvent(`${information.id}`) }/>
          </Box>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          {information?.content}  
          </Typography>
  
          </Box>

           <Box className='w-full mt-60'>
            {/* <AnnModal eventContainer={eventContainer} setEventContainer={setEventContainer} announcementId={information.id} id={information.translations?.id} artistName={information.translations?.artistName} information={information}/> */}

<ModalTranslations setEventContainer={setEventContainer} information={information}/>
           </Box>
           </Box>

        </CardContent>
      </Box>
      <CardMedia
        className={styles.eventCardImg}
        component="img"
        sx={{ width: 450 }}
        image={information?.imageSrc}
        // alt={information.artistName}
      />
    </Card>
  );
}