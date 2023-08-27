import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { fetchAllPokemon } from '../redux';
import { setPokemonDisplay } from '../redux'
import Box from '@mui/material/Box';
import PokemonView from './PokemonView';
import {Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Icon } from '@iconify/react';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import {Typography} from '@mui/material';
/*
<ListItemIcon>
                                        <Icon icon="mdi:pokeball" width="25" height="25" />
                                        </ListItemIcon>
*/

const colours = {
	Normal: '#A8A77A',
	Fire: '#EE8130',
	Water: '#6390F0',
	Electric: '#F7D02C',
	Grass: '#7AC74C',
	Ice: '#96D9D6',
	Fighting: '#C22E28',
	Poison: '#A33EA1',
	Ground: '#E2BF65',
	Flying: '#A98FF3',
	Psychic: '#F95587',
	Bug: '#A6B91A',
	Rock: '#B6A136',
	Ghost: '#735797',
	Dragon: '#6F35FC',
	Dark: '#705746',
	Steel: '#B7B7CE',
	Fairy: '#D685AD',
};





function Homescreen({pokemonListData, fetchAllPokemon, setPokemonDisplay}) {
    useEffect(() =>{
        fetchAllPokemon()
    }, [])

    const handleClick = (value) => () => {
        console.log(value);
        console.log(typeof value);
        setPokemonDisplay(value);
      };

  return (
    <Box style={{
        backgroundColor: '#282a36',
        display: "flex",
        height: '100vh'
        }} 
    sx = {{flexGrow: 1}}
    >   <Grid sx={{ flexGrow: 1, width: '100%', height: '100%' }} justifyContent="center" container spacing={0}>
            <Grid item xs={3}>
                <Grid container justifyContent="center" spacing='1'>
                <List sx={{
                    width: '100%',
                    height: '90vh',
                    bgcolor: '#d8dee9',
                    position: 'relative',
                    overflow: 'auto',
                    }}>
                        {pokemonListData && pokemonListData.pokemonList
                        && pokemonListData.pokemonList.map(pokemon => 
                            <ListItem key={pokemon.dex_num} value={pokemon.name} alignItems="flex-start">
                                <ListItemButton key={pokemon.dex_num} value={pokemon.name} onClick = {handleClick(pokemon.dex_num)}> 
                                    <ListItemAvatar>
                                        <Avatar alt={pokemon.name} src={`/sprites/${pokemon.name.charAt(0).toLowerCase() + pokemon.name.slice(1)}.png`} />
                                    </ListItemAvatar>
                                    <ListItemText primary={`${pokemon.dex_num}. ${pokemon.name}`} 
                                    primaryTypographyProps={{
                                        color: '#2e3440',
                                        fontWeight: 'bold',
                                        fontSize: '24px',
                                        variant: 'body2'
                                    }}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="h5"
                                                    color={colours[pokemon.primary_type]}
                                                    fontWeight= 'bold'>
                                                    {`${pokemon.primary_type} `}
                                            </Typography>
                                                {pokemon.secondary_type === 'None' ? '': <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="h5"
                                                    color={colours[pokemon.secondary_type]}
                                                    fontWeight= 'bold'>
                                                    {`${pokemon.secondary_type}`}
                                            </Typography>}
                                        </React.Fragment>
                                    }
                                    />
                                </ListItemButton>
                            </ListItem>
                        )
                        }   
                    </List>
                </Grid>
            </Grid>
            <Grid item xs={9}>
                <Grid container justifyContent="center" spacing='1'>
                    <PokemonView/>
                </Grid>
            </Grid>
        </Grid>
    </Box>
  );
}

const mapStateToProps = state => {
    return {
        pokemonListData: state.pokemonList,
        pokemonData: state.pokemon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllPokemon: () => dispatch(fetchAllPokemon()),
        setPokemonDisplay: (value) => dispatch(setPokemonDisplay(value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Homescreen)