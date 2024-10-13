import React, { useEffect, useCallback, useMemo } from "react";
import { Box, Autocomplete, List, ListItem, Grid, ListItemText, ListItemButton, ListItemAvatar, Avatar, Typography, TextField } from "@mui/material";
import { RootState, AppDispatch } from "../redux/index";
import { fetchAllPokemon } from '../redux/PokemonListReducer';
import { fetchPokemonByID } from "../redux/PokemonReducer";
import { addPokemonToTeam } from "../redux/PokemonTeamReducer";
import { useSelector, connect, ConnectedProps } from 'react-redux'
import { pokemon } from "../interfaces";
import { useAppDispatch } from "../hooks";
import StatList from "./StatList";


const mapStateToProps = (state: RootState) => {
    return {
        pokemonList: state.PokemonList.pokemonList,
        pokemonTeam: state.PokemonTeam.team
    }
} 

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        addPokemonToTeam: (index: number, newPokemon: pokemon) => dispatch(addPokemonToTeam({index: index, pokemon: newPokemon}))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const isEmptySlot = (pokemon: pokemon) => { 
  return pokemon.dex_num == -1
}
type Props = ConnectedProps<typeof connector>;
const PokemonSelector = ({pokemonList, pokemonTeam, addPokemonToTeam}: Props) => {
    const handleChange = (index: number, newValue: pokemon | null) => {
      if (newValue != null) {
        addPokemonToTeam(index, newValue)
      }
    }
    return (
      <Box style={{
        backgroundColor: '#282a36',
        display: "flex",
        height: '100%'
        }} 
        sx = {{flexGrow: 1}}
      >
        <List sx={{
              width: '100%',
              height: '100%',
              bgcolor: '#d8dee9',
              position: 'relative',
              overflow: 'auto',
        }}>
          {
            pokemonTeam.map((pokemon, index) => 
            <ListItem key={index} value={index} alignItems="flex-start">
              <Grid sx={{ flexGrow: 1, width: '100%', height: '100%' }} justifyContent="space-between" container spacing={0}>
                <Grid item xs={4}>
                  <Autocomplete
                    disablePortal
                    value={pokemon}
                    id="combo-box-demo"
                    options={pokemonList}
                    sx={{ width: 300 }}
                    getOptionLabel={option => option.name}
                    onChange={(event: any, newValue: pokemon | null) => {
                      handleChange(index, newValue)
                    }}
                    renderInput={(params) => <TextField {...params} label={isEmptySlot(pokemon) ? `Slot ${index+1}` : pokemon.name} />}
                  />
                  </Grid>
                  <Grid item xs={6}>
                    <StatList stats={pokemon.stats}/>
                  </Grid>
              </Grid>
            </ListItem>
            )
          }
        </List>
        
      </Box>
    );
  }
export default connector(PokemonSelector);