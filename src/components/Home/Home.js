import { Box } from "@mui/material";
import AddLanguage from "../AddLanguage/AddLanguage";
import styles from './Home.module.css'
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./SideBar";
import Events from "../Events/Events";

export default function Home() {
    return (
        <>
            <BrowserRouter>
            <Box className='flex'>

        <SideBar/>
                <Routes>
                    <Route path="/event" element={<Events />} />
                    <Route path="/language" element={<AddLanguage />} />
                </Routes>
            </Box>
            </BrowserRouter>
        </>
    )
}