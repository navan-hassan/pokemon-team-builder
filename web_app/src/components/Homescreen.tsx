import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import {Grid, Stack} from '@mui/material';
import { RootState, AppDispatch } from "../redux/index";
import { fetchAllPokemon } from '../redux/PokemonListReducer';
import PokemonListView from './PokemonListView';
import ResistanceTable from './ResistanceTable';
import PokemonSelector from './PokemonSelector';
import StatList from './StatList';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useSelector, connect, ConnectedProps } from 'react-redux'
import { pokemon } from '../interfaces';
import { emptyStats } from '../redux/PokemonTeamReducer';
import { stats } from '../interfaces';
const mapStateToProps = (state: RootState) => {
    return {
        pokemonTeamStats: state.PokemonTeam.stats
    }
} 


const connector = connect(mapStateToProps,);

type Props = ConnectedProps<typeof connector>;



const Homescreen = ({pokemonTeamStats}: Props) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAllPokemon())
    },[dispatch]);
    return (
        <Box style={{
            backgroundColor: '#282a36',
            display: "flex",
            height: '100%'
            }} 
        sx = {{flexGrow: 1}}
        >   <Grid sx={{ flexGrow: 1, width: '100%', height: '100%' }} justifyContent="center" container spacing={0}>
                <Grid item xs={5}>
                    <Grid container justifyContent="center" spacing='1'>
                        <PokemonSelector/>
                   
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justifyContent="center" spacing='1'>
                        <Grid sx={{ flexGrow: 1, width: '100%', height: '100%' }} direction="column" container spacing={0}>
                            <Grid item xs={4}>
                                <StatList stats={pokemonTeamStats ? pokemonTeamStats : emptyStats}/>
                            </Grid>
                            <Grid item xs={8}>
                                <ResistanceTable/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Box>
      );
    
}

export default connector(Homescreen);