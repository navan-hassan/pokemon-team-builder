import { useEffect } from 'react';
import Box from '@mui/material/Box';
import {Grid, Typography, Stack, Divider, Paper} from '@mui/material';
import { RootState } from "../redux/index";
import { fetchAllPokemon } from '../redux/PokemonListReducer';
import ResistanceTable from './ResistanceTable';
import PokemonSelector from './PokemonSelector';
import StatList from './StatList';
import { useAppDispatch } from '../hooks';
import { connect, ConnectedProps } from 'react-redux'
import { emptyStats } from '../redux/PokemonTeamReducer';
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
            <Grid sx={{ flexGrow: 1, width: '100%', height: '100%', }}justifyContent="center" container spacing={2}>
                <Grid item xs={6}>
                    <Grid container justifyContent="center" spacing='1'  sx={{ boxShadow: 3}} style={{backgroundColor: '#eceff4'}}>
                        <PokemonSelector/>
                   
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={0} sx={{alignItems: "stretch", flexGrow: 1,  width: '100%', height: '100%'}}>
                        <Grid direction="column" sx={{ flexGrow: 1, width: '100%', height: '100%' }} spacing={2} >
                            <Grid item xs={6}>
                                <Paper elevation={3} style={{backgroundColor: '#eceff4'}}>
                                    <Typography variant="h5"
                                            sx={{
                                                padding: 2,
                                                flexGrow: 1,
                                                fontWeight: 'bold',
                                                color: '#4c566a',
                                            }}>Average Base Stats</Typography>
                                            <Divider />
                                        <StatList stats={pokemonTeamStats ? pokemonTeamStats : emptyStats}/>
                                        </Paper>

                            </Grid>

                            <Grid item xs={6}>
                            <Box sx={{alignItems: "stretch", flexGrow: 1, width: '100%', height: '100%'}}>
                                    <ResistanceTable/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
      );
    
}

export default connector(Homescreen);