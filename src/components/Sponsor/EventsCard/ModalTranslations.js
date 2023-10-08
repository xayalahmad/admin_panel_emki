import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './EventsCard.module.css'
import TabsLanguage from './TabsLanguage';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalTranslations({sponsor, setEventContainer}) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [allLanguages, setAllLanguages] = useState('');
  const [getlang, setGetLang] = useState([]);


  useEffect(() => {
    async function getLangFunction(){
      await fetch('http://logicbackend-001-site1.htempurl.com/api/Language')
      .then(res => res.json())
      .then(data => {setGetLang(data)
   }
        )
        .catch(err => console.log(err))
      }
      getLangFunction()
}, [allLanguages])
  return (
    <>
            <EditIcon onClick={handleOpen} className={styles.editicon} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TabsLanguage setEventContainer={setEventContainer} setOpen={setOpen} sponsor={sponsor} getlang={getlang} setGetLang={setGetLang}/>
        </Box>
      </Modal>
    </>
  );
}