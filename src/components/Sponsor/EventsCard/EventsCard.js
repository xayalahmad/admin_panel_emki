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

export default function EventsCard({sponsor, setAllEvent, setEventContainer, eventContainer, setGetEvent, getEvent}) {
  const Token = localStorage.getItem("Token");
  const [get, setGetLang] = useState([]);
  const theme = useTheme();
const deleteEvent = (id) => {
    fetch(`http://logicbackend-001-site1.htempurl.com/api/Sponsor/${id}`,  {
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
    <Card sx={{ display: 'flex', alignItems: 'center', position: 'relative',margin: '15px', width: '250px', height: '250px', padding: '10px', backgroundColor: '#a1a1a1' }}>
      <Box className='absolute top-0 flex mt-2'>

               <DeleteIcon  onClick={() => deleteEvent(`${sponsor.id}`) }/>
               <ModalTranslations setEventContainer={setEventContainer} sponsor={sponsor}/>
      </Box>
<img className={styles.eventCardImg} src={sponsor?.imageSrc}/>
      {/* <CardMedia
        className={styles.eventCardImg}
        component="img"
        // sx={{ width: 250 }}
        image={sponsor?.imageSrc}
        // alt={sponsor.artistName}
      /> */}
    </Card>
  );
}