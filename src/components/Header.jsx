// @ts-nocheck
/* import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';/* 
import GroupIcon from '@mui/icons-material/Group';
import MoodIcon from '@mui/icons-material/Mood';
import PersonPinIcon from '@mui/icons-material/PersonPin'; */
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DvrIcon from '@mui/icons-material/Dvr';

import '../styles/Header.css';
import logo from '../assets/img/WealthHealth_logo_cropped.jpg';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

import { Link } from '@mui/material';
import {  useNavigate } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate(); 
    const handleClickHome = (e) => {
        e.preventDefault();
        navigate("../", {replace: false});
    }
    const handleClickList = (e) => {
        e.preventDefault();
        navigate("../employee-list", {replace: false});
    }

    return (
        <header>
            <Box className="logo" sx={{ m:2 }}>
                <Link href="/" underline='none' color='inherit' onClick={handleClickHome}>    
                <h1>
                    <img src={logo} alt='logo' width="80px" height="80px" />
HRnet
                </h1>
                </Link>
            </Box>

            <nav>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'right',
                        '& > *': {
                            m: 2,
                        },
                    }}
                >
                    
                    <ButtonGroup variant="text" aria-label="text button group">
                        <Link href="/" onClick={handleClickHome}>
                            <Button className="navItem">
                                <PersonAddAlt1Icon className="navItemIcon" sx={{color: "rgb(147, 173, 24)"}} />&nbsp;&nbsp;New Employee
                            </Button>
                        </Link>
                        <Link href="/employee-list" onClick={handleClickList}>
                            <Button className="navItem">
                                <DvrIcon className="navItemIcon" sx={{color: "rgb(147, 173, 24)"}} />&nbsp;&nbsp;Current Employees
                            </Button>
                        </Link>
                    </ButtonGroup>
                    
                </Box>
            </nav>
        </header>
    )
}

