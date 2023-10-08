import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import styles from './Home.module.css'
import logo from '../../image/emkiLogoLight.svg'
export default function SideBar(){
    return(
        <>
                    <Box className={styles.itemsContainer1}>
                        <Box className='flex justify-center text-center mt-20'>
                        <img className={styles.image} src={logo}/>
                        </Box>
                <Box className={styles.itemsContainer}>
                    <Link to="/event">{" "}
                        <Box className={styles.item}>
                            Tədbir
                        </Box>
                    </Link>
                    <Link to="/blog">{" "}
                        <Box className={styles.item}>
                            Bloq
                        </Box>
                    </Link>
                    <Link to="/sponsor">{" "}
                        <Box className={styles.item}>
                            Sponsor
                        </Box>
                    </Link>
                    <Link to="/artist">{" "}
                        <Box className={styles.item}>
                            Sənətçi
                        </Box>
                    </Link>
                    <Link to="/information">{" "}
                        <Box className={styles.item}>
                            Məlumat
                        </Box>
                    </Link>
                    <Link to="/language">{" "}
                        <Box className={styles.item}>
                            Dil
                        </Box>
                    </Link>
                </Box>
            </Box>
        </>
    )
}