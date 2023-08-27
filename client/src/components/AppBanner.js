import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import {useNavigate} from 'react-router-dom'



const AppBanner = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="sticky" sx={{backgroundColor: "#282a36"}}>
                <Toolbar>
                    <Typography
                        variant="h5"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 'bold',
                            letterSpacing: '.1rem',
                            color: '#f8f8f2',
                            textDecoration: 'none',
                            margin: 'margin-left',
                        }}>
                        Pokédex
                    </Typography>
                    <Box  spacing={2} style={{justifyContent: 'space-between'}} sx={{ display: { xs: 'flex', sm: 'block' } }}>
                        <Button onClick={() => navigate("/team")}>
                            {"Team"}
                        </Button>
                        <Button onClick={() => navigate("/")}>
                            {"PokemonList"}
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
  )
}
export default AppBanner;