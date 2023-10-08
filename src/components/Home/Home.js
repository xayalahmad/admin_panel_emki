import { Box } from "@mui/material";
import AddLanguage from "../AddLanguage/AddLanguage";
import styles from './Home.module.css'
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./SideBar";
import Events from "../Events/Events";
import Blog from "../Blog/Blog";
import Artist from "../Artist/Artist";
import Sponsor from "../Sponsor/Sponsor";
import Information from "../Information/Information";
import HomePage from "./HomePage";

export default function Home() {
    return (
        <>
            <BrowserRouter>
            <Box className='flex'>

        <SideBar/>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/event" element={<Events />} />
                    <Route path="/language" element={<AddLanguage />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/artist" element={<Artist />} />
                    <Route path="/sponsor" element={<Sponsor />} />
                    <Route path="/information" element={<Information />} />
                </Routes>
            </Box>
            </BrowserRouter>
        </>
    )
}