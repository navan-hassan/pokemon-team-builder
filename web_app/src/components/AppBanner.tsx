import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


const AppBanner = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="sticky" sx={{backgroundColor: "#e5e9f0"}}>
                <Toolbar>
                    <Typography
                        variant="h5"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 'bold',
                            letterSpacing: '.1rem',
                            color: '#2e3440',
                            textDecoration: 'none',
                            margin: 'margin-left',
                        }}>
                        Pokémon Team Builder
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
  )
}
export default AppBanner;