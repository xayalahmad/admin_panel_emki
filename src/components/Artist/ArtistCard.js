import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditModal from "./EditModal";
import { setTokenBoolean } from "../../stores/tokenBoolean";
import { useDispatch } from 'react-redux';
import styles from './AddArtist.module.css'
export default function ArtistCard({artist, setGetLang, getlang , setAllLanguages, allLanguages, setEventContainer}) {
    console.log(artist);
    const dispatch = useDispatch()

    const Token = localStorage.getItem("Token");

    const deleteLang = (id) => {
      console.log(id);
        fetch(`http://logicbackend-001-site1.htempurl.com/api/Artist/${id}`,  {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + Token
            }
        })
        setGetLang(getlang.filter(languages => languages.id != id))
        // .then(res => res.json())
        // .then(data => {
        //   setGetLang(getlang.filter(languages => languages.id != id))
        //   console.log(data);
        // })
        // .catch(err => {
        //   // dispatch(setTokenBoolean(false))
        //   console.log(err);

        // })
        // setAllLanguages(allLanguages.filter(languages => languages.id != id))
        console.log(getlang);
        console.log(id);
    }
  return (
    <Card sx={{ marginBottom: '35px', width: '384px' }}>
      <CardMedia
        component="img"
        alt={artist.name}
        // height="140"
        width='384'
        className={styles.cardImg}
        image={artist.imageSrc}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {artist.name}
        </Typography>
      </CardContent>
      <CardActions>
       <EditModal className={styles.editicon} setGetLang={setGetLang} getlang={getlang} setAllLanguages={setAllLanguages} allLanguages={allLanguages} item={artist} />
         <DeleteIcon  className={styles.deleteicon} onClick={() => deleteLang(`${artist.id}`) }/>
      </CardActions>
    </Card>
  );
}