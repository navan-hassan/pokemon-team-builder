import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AccountCircle } from '@mui/icons-material';
import { Box, Menu, MenuItem } from '@mui/material';





const AppBanner = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };

    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(null);
    }
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
                    <div>
                        <IconButton
                            size="large"
                            aria-label="Current User"
                            aria-controls="login-menu"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                                id="login-menu"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                            >
                            <MenuItem onClick={handleClose}>Sign In</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
  )
}
export default AppBanner;