import React, { useEffect, useCallback, useMemo } from "react";
import { List, ListItem, ListItemText, ListItemButton, ListItemAvatar, Avatar, Typography } from "@mui/material";
import { RootState, AppDispatch } from "../redux/index";
import { fetchAllPokemon } from '../redux/PokemonListReducer';
import { fetchPokemonByID } from "../redux/PokemonReducer";
import { useSelector, connect, ConnectedProps } from 'react-redux'
import { pokemon } from "../interfaces";
import { useAppDispatch } from "../hooks";

const colours = {
	"Normal": '#A8A77A',
	"Fire": '#EE8130',
	"Water": '#6390F0',
	"Electric": '#F7D02C',
	"Grass": '#7AC74C',
	"Ice": '#96D9D6',
	"Fighting": '#C22E28',
	"Poison": '#A33EA1',
	"Ground": '#E2BF65',
	"Flying": '#A98FF3',
	"Psychic": '#F95587',
	"Bug": '#A6B91A',
	"Rock": '#B6A136',
	"Ghost": '#735797',
	"Dragon": '#6F35FC',
	"Dark": '#705746',
	"Steel": '#B7B7CE',
	"Fairy": '#D685AD',
};

const mapStateToProps = (state: RootState) => {
    return {
        pokemonList: state.PokemonList.pokemonList
    }
} 

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        fetchAllPokemon: () => dispatch(fetchAllPokemon()),
        fetchPokemonByID: (id: number) => dispatch(fetchPokemonByID(id))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;


const PokemonListView = ({pokemonList, fetchAllPokemon, fetchPokemonByID}: Props) => {
    
    //console.log(pokemonList);
    const handleClick = (id: number) => {
        fetchPokemonByID(id)
    }
    
    return (
        <List sx={{
            width: '100%',
            height: '90vh',
            bgcolor: '#d8dee9',
            position: 'relative',
            overflow: 'auto',
            }}>
            {pokemonList ? pokemonList.map((pokemon) => 
                <ListItem key={pokemon.dex_num} value={pokemon.name} alignItems="flex-start">
                    <ListItemButton onClick={() => handleClick(pokemon.dex_num)}>
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
                                        //color={colours[pokemon.primary_type]}
                                        fontWeight= 'bold'>
                                        {`${pokemon.primary_type} `}
                                </Typography>
                                    {pokemon.secondary_type === 'None' ? '': <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="h5"
                                        //color={colours[pokemon.secondary_type]}
                                        fontWeight= 'bold'>
                                        {`${pokemon.secondary_type}`}
                                </Typography>}
                            </React.Fragment>
                        }
                        />
                    </ListItemButton>
                </ListItem>
                ) : <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="h5"
                //color={colours[pokemon.primary_type]}
                fontWeight= 'bold'>
                {"List"}
                </Typography>
            }   
        </List>
    )
}
/**
 * <List sx={{
            width: '100%',
            height: '90vh',
            bgcolor: '#d8dee9',
            position: 'relative',
            overflow: 'auto',
            }}>
            {pokemonList ? pokemonList.map((pokemon) => 
                <ListItem key={pokemon.dex_num} value={pokemon.name} alignItems="flex-start">
                    <ListItemButton onClick={() => handleClick(pokemon.dex_num)}>
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
                                        //color={colours[pokemon.primary_type]}
                                        fontWeight= 'bold'>
                                        {`${pokemon.primary_type} `}
                                </Typography>
                                    {pokemon.secondary_type === 'None' ? '': <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="h5"
                                        //color={colours[pokemon.secondary_type]}
                                        fontWeight= 'bold'>
                                        {`${pokemon.secondary_type}`}
                                </Typography>}
                            </React.Fragment>
                        }
                        />
                    </ListItemButton>
                </ListItem>
                ) : <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="h5"
                //color={colours[pokemon.primary_type]}
                fontWeight= 'bold'>
                {"List"}
                </Typography>
            }   
        </List>
 */




export default connector(PokemonListView);