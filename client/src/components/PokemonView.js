import React from 'react';
import { connect } from 'react-redux'
import Box from '@mui/material/Box';
import { Card, CardContent, Typography,Grid,Avatar, List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader'
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { addPokemonToTeam } from '../redux';

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

/*
<Typography  sx={{ display: 'inline' }}
                                        component="span"
                                        variant="h5"
                                        fontWeight= 'bold'>
                                            {'Type: '}
                                    </Typography>
                                    <React.Fragment>
                                        <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="h5"
                                                color={colours[pokemonData.pokemon.primary_type]}
                                                fontWeight= 'bold'>
                                                {`${pokemonData.pokemon.primary_type} `}
                                        </Typography>
                                        {pokemonData.pokemon.secondary_type === '' ? '': 
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="h5"
                                                color={colours[pokemonData.pokemon.secondary_type]}
                                                fontWeight= 'bold'>
                                                {`${pokemonData.pokemon.secondary_type}`}
                                            </Typography>}
                                    </React.Fragment>
                                */

function PokemonView({pokemonData, team}) {

    const handleClick = () => () => {
        console.log(pokemonData.pokemon)
        console.log(team.team)
        if (pokemonData.pokemon){
            addPokemonToTeam(pokemonData.pokemon, team.team)
        }
      };


    const statList = (
        <List sx={{
            width: '100%',
            height: '100%',
            bgcolor: '#d8dee9',
            position: 'relative',
            overflow: 'auto'}}>
            <ListItem sx= {{bgcolor:'#f6685e'}} component="div" disablePadding divider>
                <ListItemText
                    primary={`HP: ${pokemonData.pokemon ? pokemonData.pokemon.hp : 0}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'medium',
                        variant: "body2",
                    }}/>
            </ListItem>
            <ListItem sx= {{bgcolor:'#ffac33'}} component="div" disablePadding divider>
                <ListItemText
                    primary={`ATTACK: ${pokemonData.pokemon ? pokemonData.pokemon.attack : 0}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'medium',
                        variant: "body2",
                    }}/>
            </ListItem>
            <ListItem sx= {{bgcolor:'#ffef62'}} component="div" disablePadding divider>
                <ListItemText
                    primary={`DEFENSE: ${pokemonData.pokemon ? pokemonData.pokemon.defense : 0}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'medium',
                        variant: "body2",
                    }}/>
            </ListItem>
            <ListItem sx= {{bgcolor:'#33c9dc'}} component="div" disablePadding divider>
                <ListItemText
                    primary={`SP. ATTACK: ${pokemonData.pokemon ? pokemonData.pokemon.sp_attack : 0}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'medium',
                        variant: "body2",
                    }}/>
            </ListItem>
            <ListItem sx= {{bgcolor:'#6fbf73'}} component="div" disablePadding divider>
                <ListItemText
                    primary={`SP. DEFENSE: ${pokemonData.pokemon ? pokemonData.pokemon.sp_defense : 0}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'medium',
                        variant: "body2",
                    }}/>
            </ListItem>
            <ListItem sx= {{bgcolor:'#ed4b82'}} component="div" disablePadding divider>
                <ListItemText
                    primary={`SPEED: ${pokemonData.pokemon ? pokemonData.pokemon.speed : 0}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'medium',
                        variant: "body2",
                }}/>
            </ListItem>
            <ListItem component="div" disablePadding divider>
                <ListItemText
                    primary={`TOTAL: ${pokemonData.pokemon ? pokemonData.pokemon.base_stat_total : 0}`}
                    primaryTypographyProps={{
                        color: '#434c5e',
                        fontWeight: 'medium',
                        variant: "body2",
                }}/>
            </ListItem>
        </List>
    )

    const resistancesTable = (
        pokemonData.pokemon  && pokemonData.pokemon.defensive_coverage ? 
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell colSpan={4}>Defensive Coverage</TableCell>
            </TableRow>
            </TableHead>
                <TableBody>
                    <TableRow key={'normal'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Normal']}
                                fontWeight= 'medium'>
                                    Normal
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.normal > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.normal < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.normal === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.normal : 0}
                            </Typography>
                        </TableCell>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Fire']}
                                fontWeight='medium'>
                                    Fire
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.fire > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.fire < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.fire === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.fire : 0}
                            </Typography> 
                        </TableCell>
                    </TableRow>
                    <TableRow key={'water'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Water']}
                                fontWeight= 'medium'>
                                    Water
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.water > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.water < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.water === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.water : 0}
                            </Typography>
                        </TableCell>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Electric']}
                                fontWeight= 'medium'>
                                    Electric
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.electric > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.electric < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.electric === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.electric : 0}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow key={'grass'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Grass']}
                                fontWeight= 'medium'>
                                    Grass
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.grass > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.grass < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.grass === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.grass : 0}
                            </Typography>
                        </TableCell>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Ice']}
                                fontWeight= 'medium'>
                                    Ice
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.ice > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.ice < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.ice === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.ice : 0}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow key={'fighting'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Fighting']}
                                fontWeight= 'medium'>
                                    Fighting
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.fighting > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.fighting < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.fighting === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.fighting : 0}
                            </Typography>
                        </TableCell>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Poison']}
                                fontWeight= 'medium'>
                                    Poison
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.poison > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.poison < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.poison === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.poison : 0}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow key={'ground'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Ground']}
                                fontWeight= 'medium'>
                                    Ground
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.ground > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.ground < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.ground === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.ground : 0}
                            </Typography>
                        </TableCell>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Flying']}
                                fontWeight= 'medium'>
                                    Flying
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.flying > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.flying < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.flying === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.flying : 0}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow key={'psychic'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Psychic']}
                                fontWeight= 'medium'>
                                    Psychic
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.psychic > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.psychic < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.psychic === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.psychic : 0}
                            </Typography>
                        </TableCell>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Bug']}
                                fontWeight= 'medium'>
                                    Bug
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.bug > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.bug < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.bug === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.bug : 0}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow key={'rock'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Rock']}
                                fontWeight= 'medium'>
                                    Rock
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.rock > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.rock < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.rock === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.rock : 0}
                            </Typography>
                        </TableCell>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Ghost']}
                                fontWeight= 'medium'>
                                    Ghost
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.ghost > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.ghost < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.ghost === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.ghost : 0}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow key={'dragon'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Dragon']}
                                fontWeight= 'medium'>
                                    Dragon
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.dragon > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.dragon < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.dragon === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.dragon : 0}
                            </Typography>
                        </TableCell>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Dark']}
                                fontWeight= 'medium'>
                                    Dark
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.dark > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.dark < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.dark === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.dark : 0}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow key={'steel'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Steel']}
                                fontWeight= 'medium'>
                                    Steel
                            </Typography>
                        </TableCell>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.steel > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.steel < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.steel === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.steel : 0}
                            </Typography>
                        </TableCell>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color={colours['Fairy']}
                                fontWeight= 'medium'>
                                    Fairy
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >
                            <Typography
                                variant="body2"
                                color = {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.fairy > 1.0)) ? '#bf616a' : 
                                (pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.fairy < 1.0)) ? '#a3be8c' : '#2e3440'}
                                fontWeight= {(pokemonData.pokemon && (pokemonData.pokemon.defensive_coverage.fairy === 1.0)) ? 'medium' : 'bold'}>
                                    {pokemonData.pokemon ? pokemonData.pokemon.defensive_coverage.fairy : 0}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer> : <Box/>
    )

    const attributesTable = (
        (pokemonData.pokemon &&
            pokemonData.pokemon.primary_type &&
            pokemonData.pokemon.ability1 &&
            pokemonData.pokemon.hidden_ability) ? 
            <TableContainer component={Paper}>
                <Table sx={{width: "100%" }} aria-label="simple table">
                    <TableBody>
                        <TableRow
                            key={'primary-type'}>
                            <TableCell align='left'>
                                <Typography
                                    variant="body2"
                                    color="2e3440"
                                    fontWeight= 'medium'>
                                    {'Type'}
                                </Typography>
                            </TableCell>
                            <TableCell align='left' >                                               
                                <Typography
                                    variant="body2"
                                    color={colours[pokemonData.pokemon.primary_type]}
                                    fontWeight= 'medium'>
                                    {`${pokemonData.pokemon.primary_type}`}
                                </Typography>                                                               
                            </TableCell>
                            <TableCell align='left'>
                                {pokemonData.pokemon.secondary_type === 'None' ? 
                                <Typography/> : 
                                <Typography
                                    variant="body2"
                                    color={colours[pokemonData.pokemon.secondary_type]}
                                    fontWeight= 'medium'>
                                    {`${pokemonData.pokemon.secondary_type}`}
                                </Typography>}
                            </TableCell>
                        </TableRow>
                        <TableRow
                            key={'ability'}>
                            <TableCell align='left'>
                                <Typography
                                    variant="body2"
                                    color="2e3440"
                                    fontWeight= 'medium'>
                                    {'Ability'}
                                </Typography>
                            </TableCell>
                            <TableCell align='left'>
                                <Typography
                                    variant="body2"
                                    color="2e3440"
                                    fontWeight= 'medium'>
                                        {pokemonData.pokemon.ability1}    
                                </Typography>
                            </TableCell>
                            <TableCell align='left'>
                                <Typography
                                    variant="body2"
                                    color="2e3440"
                                    fontWeight= 'medium'>
                                        {pokemonData.pokemon.ability2 == 'None' ? "" :
                                        pokemonData.pokemon.ability2}
                                </Typography>
                            </TableCell>     
                        </TableRow>
                        <TableRow
                            key={'hidden-ability'}>
                            <TableCell align='left'>
                                <Typography
                                    variant="body2"
                                    color="2e3440"
                                    fontWeight= 'medium'>
                                    {'Hidden Ability'}
                                </Typography>
                            </TableCell>
                            <TableCell align='left'>
                                <Typography
                                    variant="body2"
                                    color="2e3440"
                                    fontWeight= 'medium'>
                                    {pokemonData.pokemon.hidden_ability
                                    .trim()
                                    .split(' ')
                                    .map((s) => s.trim().charAt(0).toUpperCase() + s.trim().substring(1))   
                                    .join(' ')}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> :
            <TableContainer component={Paper}>
                <Table sx={{width: "100%" }} aria-label="simple table"/>
            </TableContainer>)

    return (pokemonData.pokemon && pokemonData.pokemon.name ?
    (<Card style={{backgroundColor: '#e5e9f0'}} sx={{ height: '100%', width: '100%' }}>
        <CardContent>
        <Stack direction={'row'} spacing={1}>
            <Grid container justifyContent="center" sx={{width:'100%'}} direction="column" spacing={0}>
                <Grid item xs={3}>
                    <Stack direction={'row'}justifyContent='space-between'>
                    <Button variant='outlined' color="secondary" onClick={handleClick()}>
                        Add to Team
                    </Button>
                    <Typography
                        fontWeight={'bold'}
                        variant="h3">
                        {(`${pokemonData.pokemon.name.charAt(0).toUpperCase() + pokemonData.pokemon.name.slice(1)}`)}
                    </Typography>
                    <Avatar 
                        sx={{bgcolor: '#2e3440',  
                                width: 100, 
                                height: 100 }} 
                        variant="rounded" alt={pokemonData.pokemon.name} 
                        src={`/sprites/${pokemonData.pokemon.name}.png`}
                    /> 
                    </Stack>    
                </Grid>
                <Grid item xs={4}>{attributesTable}</Grid>
                <Grid item xs={4}>{statList}</Grid>
            </Grid>
            
            {resistancesTable}
        </Stack>   
        </CardContent>
    </Card>) : (<Box style={{
        backgroundColor: '#282a36',
        
        width: '100%',
        height: '100%'
        }} 
    sx = {{flexGrow: 1}}
    ></Box>)
  );
}


const mapDispatchToProps = dispatch => {
    return {
        addPokemonToTeam: (pokemon, oldTeam) => dispatch(addPokemonToTeam(pokemon, oldTeam))
    }
}

const mapStateToProps = state => {
    return {
        pokemonData: state.pokemon,
        team: state.team
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonView)