import React, { useEffect, useCallback, useMemo } from "react";
import { List, ListItem, ListItemText, ListItemButton, ListItemAvatar, Avatar, Typography } from "@mui/material";
import { RootState, AppDispatch } from "../redux/index";
import { fetchAllPokemon } from '../redux/PokemonListReducer';
import { fetchPokemonByID } from "../redux/PokemonReducer";
import { useSelector, connect, ConnectedProps } from 'react-redux'
import { pokemon } from "../interfaces";
import { useAppDispatch } from "../hooks";


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
                <ListItem key={pokemon.id} value={pokemon.name} alignItems="flex-start">
                    <ListItemButton onClick={() => handleClick(pokemon.id)}>
                        <ListItemText primary={`${pokemon.id}. ${pokemon.name}`} 
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

export default connector(PokemonListView);