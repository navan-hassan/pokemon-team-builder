import { Box, Autocomplete, List, ListItem, Grid, TextField, ListItemAvatar, Avatar } from "@mui/material";

import { RootState, AppDispatch } from "../redux/index";
import { createTeam } from "../redux/PokemonTeamReducer";
import { connect, ConnectedProps } from 'react-redux'
import { pokemon } from "../interfaces";
import StatList from "./StatList";

const emptySprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
const mapStateToProps = (state: RootState) => {
    return {
        pokemonList: state.PokemonList.pokemonList,
        pokemonTeam: state.PokemonTeam.team,
        pokemonTeamId: state.PokemonTeam.team_id
    }
} 

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        createPokemonTeamAction: (team: [number, pokemon[]]) => dispatch(createTeam(team))
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const isEmptySlot = (pokemon: pokemon) => { 
  return pokemon.id == -1
}
type Props = ConnectedProps<typeof connector>;
const PokemonSelector = ({pokemonList, pokemonTeam, pokemonTeamId, createPokemonTeamAction}: Props) => {
    const handleChange = (index: number, newValue: pokemon | null) => {
      if (newValue != null) {
        var newTeam = [...pokemonTeam];
        newTeam[index] = newValue;
        
        createPokemonTeamAction([pokemonTeamId, newTeam])
      }
    }
    return (
      /*<Box style={{
        backgroundColor: '#eceff4',
        display: "flex",
        height: '100%'
        }} 
        sx = {{flexGrow: 1}}
      >*/
        <List sx={{
              width: '100%',
              height: '100%',
              bgcolor: '#eceff4',
              position: 'relative',
              overflow: 'auto',

              
        }}>
          {
            pokemonTeam.map((pokemon, index) => 
            <ListItem key={index} value={index} alignItems="center">

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
                  <Avatar alt={pokemon.name} sx={{ width: 100, height: 100 }} src={(pokemon.sprite == null || pokemon.sprite == "None") ? emptySprite : pokemon.sprite} />
                
                  </Grid>
                  <Grid item xs={6}>
                    <StatList stats={pokemon.stats}/>
                  </Grid>
              </Grid>
            </ListItem>
            
            )
          }
        </List>
        
      //</Box>
    );
  }
export default connector(PokemonSelector);