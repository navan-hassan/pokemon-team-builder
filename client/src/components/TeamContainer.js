import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { removePokemonFromTeam } from '../redux';
import Box from '@mui/material/Box';
import { Grid, List, ListItem, ListItemAvatar, ListItemText, Avatar, 
    Table, TableContainer, TableRow, TableCell, TableBody, TableHead,
    Paper, Typography} from '@mui/material';


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
    


function calculateStatAverages(team) {
    let hp = 0.0
    let attack = 0.0
    let defense = 0.0
    let sp_atk = 0.0
    let sp_def = 0.0
    let speed = 0.0
    let bst =  0.0

    team.forEach(pokemon => {
        if (pokemon){
            hp += pokemon.hp;
            attack += pokemon.attack;
            defense += pokemon.defense;
            sp_atk += pokemon.sp_attack;
            sp_def += pokemon.sp_defense;
            speed += pokemon.speed;
            bst += pokemon.base_stat_total
        }
    });
    if (team.length > 1){
        hp /= team.length
        attack /= team.length
        defense /= team.length
        sp_atk /= team.length
        sp_def /= team.length
        speed /= team.length
        bst /= team.length
    }
    return {
        hp: hp,
        attack: attack,
        defense: defense,
        sp_atk: sp_atk,
        sp_def: sp_def,
        speed: speed,
        bst: bst
    }}

   

function TeamContainer(team, removePokemonFromTeam){

    const averageStats = (team) => {
        let statAverages = calculateStatAverages(team)

        return(
            <TableContainer component={Paper}>
            <Table sx={{width: "100%" }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={3}>
                            Stat Averages
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        key={'primary-type'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color="2e3440"
                                fontWeight= 'medium'>
                                {'HP'}
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >                                               
                            <Typography
                                variant="body2"
                                color="2e3440"
                                fontWeight= 'medium'>
                                {statAverages.hp.toFixed(1)}
                            </Typography>                                                               
                        </TableCell>
                    </TableRow>
                    <TableRow
                        key={'avg-attack'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color="2e3440"
                                fontWeight= 'medium'>
                                {'ATTACK'}
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >                                               
                            <Typography
                                variant="body2"
                                color="2e3440"
                                fontWeight= 'medium'>
                                {statAverages.attack.toFixed(1)}
                            </Typography>                                                               
                        </TableCell>
                    </TableRow>
                    <TableRow
                        key={'avg-defense'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color="2e3440"
                                fontWeight= 'medium'>
                                {'DEFENSE'}
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >                                               
                            <Typography
                                variant="body2"
                                color="2e3440"
                                fontWeight= 'medium'>
                                {statAverages.defense.toFixed(1)}
                            </Typography>                                                               
                        </TableCell>
                    </TableRow>
                    <TableRow
                        key={'avg-spatk'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color="2e3440"
                                fontWeight= 'medium'>
                                {'SP. ATTACK'}
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >                                               
                            <Typography
                                variant="body2"
                                color="2e3440"
                                fontWeight= 'medium'>
                                {statAverages.sp_atk.toFixed(1)}
                            </Typography>                                                               
                        </TableCell>
                    </TableRow>
                    <TableRow
                        key={'avg-spdef'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color="2e3440"
                                fontWeight= 'medium'>
                                {'SP. DEFENSE'}
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >                                               
                            <Typography
                                variant="body2"
                                color="2e3440"
                                fontWeight= 'medium'>
                                {statAverages.sp_def.toFixed(1)}
                            </Typography>                                                               
                        </TableCell>
                    </TableRow>
                    <TableRow
                        key={'avg-speed'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color="2e3440"
                                fontWeight= 'medium'>
                                {'SPEED'}
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >                                               
                            <Typography
                                variant="body2"
                                color="2e3440"
                                fontWeight= 'medium'>
                                {statAverages.speed.toFixed(1)}
                            </Typography>                                                               
                        </TableCell>
                    </TableRow>
                    <TableRow
                        key={'avg-bst'}>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color="2e3440"
                                fontWeight= 'medium'>
                                {'BST'}
                            </Typography>
                        </TableCell>
                        <TableCell align='left' >                                               
                            <Typography
                                variant="body2"
                                color="2e3440"
                                fontWeight= 'medium'>
                                {statAverages.bst.toFixed(1)}
                            </Typography>                                                               
                        </TableCell>
                    </TableRow>
                    
                </TableBody>
            </Table>
        </TableContainer>)
}
/*
    const averageStats = (
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
                            {'HP'}
                        </Typography>
                    </TableCell>
                    <TableCell align='left' >                                               
                        <Typography
                            variant="body2"
                            color="2e3440"
                            fontWeight= 'medium'>
                            {team.team.statAverages.hp}
                        </Typography>                                                               
                    </TableCell>
                </TableRow>
                <TableRow
                    key={'avg-attack'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color="2e3440"
                            fontWeight= 'medium'>
                            {'ATTACK'}
                        </Typography>
                    </TableCell>
                    <TableCell align='left' >                                               
                        <Typography
                            variant="body2"
                            color="2e3440"
                            fontWeight= 'medium'>
                            {team.team.statAverages.attack}
                        </Typography>                                                               
                    </TableCell>
                </TableRow>
                <TableRow
                    key={'avg-defense'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color="2e3440"
                            fontWeight= 'medium'>
                            {'DEFENSE'}
                        </Typography>
                    </TableCell>
                    <TableCell align='left' >                                               
                        <Typography
                            variant="body2"
                            color="2e3440"
                            fontWeight= 'medium'>
                            {team.team.statAverages.defense}
                        </Typography>                                                               
                    </TableCell>
                </TableRow>
                <TableRow
                    key={'avg-spatk'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color="2e3440"
                            fontWeight= 'medium'>
                            {'SP. ATTACK'}
                        </Typography>
                    </TableCell>
                    <TableCell align='left' >                                               
                        <Typography
                            variant="body2"
                            color="2e3440"
                            fontWeight= 'medium'>
                            {team.team.statAverages.sp_atk}
                        </Typography>                                                               
                    </TableCell>
                </TableRow>
                <TableRow
                    key={'avg-spdef'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color="2e3440"
                            fontWeight= 'medium'>
                            {'SP. DEFENSE'}
                        </Typography>
                    </TableCell>
                    <TableCell align='left' >                                               
                        <Typography
                            variant="body2"
                            color="2e3440"
                            fontWeight= 'medium'>
                            {team.team.statAverages.sp_def}
                        </Typography>                                                               
                    </TableCell>
                </TableRow>
                <TableRow
                    key={'avg-speed'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color="2e3440"
                            fontWeight= 'medium'>
                            {'SPEED'}
                        </Typography>
                    </TableCell>
                    <TableCell align='left' >                                               
                        <Typography
                            variant="body2"
                            color="2e3440"
                            fontWeight= 'medium'>
                            {team.team.statAverages.speed}
                        </Typography>                                                               
                    </TableCell>
                </TableRow>
                <TableRow
                    key={'avg-bst'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color="2e3440"
                            fontWeight= 'medium'>
                            {'BST'}
                        </Typography>
                    </TableCell>
                    <TableCell align='left' >                                               
                        <Typography
                            variant="body2"
                            color="2e3440"
                            fontWeight= 'medium'>
                            {team.team.statAverages.bst}
                        </Typography>                                                               
                    </TableCell>
                </TableRow>
                
            </TableBody>
        </Table>
    </TableContainer>
    )*/

    const resistancesTable = (
        <TableContainer component={Paper}>
            <Table sx={{width: "100%" }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>{(team.team.team && team.team.team[0]) ? <Avatar alt={team.team.team[0].name} src={`/sprites/${team.team.team[0].name}.png`} /> : 'Pokemon 1'}</TableCell>
                    <TableCell>{(team.team.team && team.team.team[1])  ? <Avatar alt={team.team.team[1].name} src={`/sprites/${team.team.team[1].name}.png`} /> :'Pokemon 2'}</TableCell>
                    <TableCell>{(team.team.team && team.team.team[2])  ? <Avatar alt={team.team.team[2].name} src={`/sprites/${team.team.team[2].name}.png`} /> :'Pokemon 3'}</TableCell>
                    <TableCell>{(team.team.team && team.team.team[3])  ? <Avatar alt={team.team.team[3].name} src={`/sprites/${team.team.team[3].name}.png`} /> :'Pokemon 4'}</TableCell>
                    <TableCell>{(team.team.team && team.team.team[4])  ? <Avatar alt={team.team.team[4].name} src={`/sprites/${team.team.team[4].name}.png`} /> :'Pokemon 5'}</TableCell>
                    <TableCell>{(team.team.team && team.team.team[5]) ? <Avatar alt={team.team.team[5].name} src={`/sprites/${team.team.team[5].name}.png`} /> :'Pokemon 6'}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow colSpan={2}key={'normal'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Normal']}
                            fontWeight= 'medium'>
                                Normal
                        </Typography>
                    </TableCell>
                    {
                    team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.normal > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.normal < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.normal === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.normal}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2} key={'fire'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Fire']}
                            fontWeight= 'medium'>
                                Fire
                        </Typography>
                    </TableCell>

                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.fire > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.fire < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.fire === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.fire}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2} key={'water'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Water']}
                            fontWeight= 'medium'>
                                Water
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.water > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.water < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.water === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.water}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2} key={'electric'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Electric']}
                            fontWeight= 'medium'>
                                Electric
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.electric > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.electric < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.electric === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.electric}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2}key={'grass'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Grass']}
                            fontWeight= 'medium'>
                                Grass
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.grass > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.grass < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.grass === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.grass}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2} key={'ice'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Ice']}
                            fontWeight= 'medium'>
                                Ice
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.ice > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.ice < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.ice === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.ice}
                            </Typography>
                        </TableCell>
                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2} key={'fighting'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Fighting']}
                            fontWeight= 'medium'>
                                Fighting
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.fighting > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.fighting < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.fighting === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.fighting}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2} key={'poison'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Poison']}
                            fontWeight= 'medium'>
                                Poison
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.poison > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.poison < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.poison === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.poison}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2}key={'ground'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Ground']}
                            fontWeight= 'medium'>
                                Ground
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.ground > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.ground < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.ground === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.ground}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2} key={'flying'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Flying']}
                            fontWeight= 'medium'>
                                Flying
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.flying > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.flying < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.flying === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.flying}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2} key={'psychic'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Psychic']}
                            fontWeight= 'medium'>
                                Psychic
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.psychic > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.psychic < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.psychic === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.psychic}
                            </Typography>
                        </TableCell>
                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2} key={'bug'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Bug']}
                            fontWeight= 'medium'>
                                Bug
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.bug > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.bug < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.bug === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.bug}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>

                <TableRow colSpan={2} key={'rock'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Rock']}
                            fontWeight= 'medium'>
                                Rock
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.rock > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.rock < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.rock === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.rock}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2} key={'ghost'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Ghost']}
                            fontWeight= 'medium'>
                                Ghost
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.ghost > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.ghost < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.ghost === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.ghost}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2} key={'dragon'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Dragon']}
                            fontWeight= 'medium'>
                                Dragon
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.dragon > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.dragon < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.dragon === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.dragon}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2} key={'Dark'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Dark']}
                            fontWeight= 'medium'>
                                Dark
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.dark > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.dark < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.dark === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.dark}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2} key={'steel'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Steel']}
                            fontWeight= 'medium'>
                                Steel
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.steel > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.steel < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.steel === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.steel}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>
                <TableRow colSpan={2} key={'Fairy'}>
                    <TableCell align='left'>
                        <Typography
                            variant="body2"
                            color={colours['Fairy']}
                            fontWeight= 'medium'>
                                Fairy
                        </Typography>
                    </TableCell>
                    {team.team.team ? team.team.team.map(pokemon =>
                        <TableCell align='left'>
                            <Typography
                                variant="body2"
                                color = {pokemon.defensive_coverage.fairy > 1.0 ? '#bf616a' : 
                                pokemon.defensive_coverage.fairy < 1.0 ? '#a3be8c' : '#2e3440'}
                                fontWeight= {pokemon.defensive_coverage.fairy === 1.0 ? 'medium' : 'bold'}>
                                    {pokemon.defensive_coverage.fairy}
                            </Typography>
                        </TableCell>

                        ) : ''
                    }
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>

    )


    const teamListView = (
        <List>
            {team.team ? team.team.team.map(pokemon => 
                <ListItem key={pokemon.id}>
                    <ListItemAvatar>
                        <Avatar alt={pokemon.name} src={`/sprites/${pokemon.name}.png`} />
                    </ListItemAvatar>
                    <ListItemText primary={`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`} 
                                    primaryTypographyProps={{
                                        color: '#2e3440',
                                        fontWeight: 'bold',
                                        fontSize: '24px',
                                        variant: 'body2'
                                    }}
                                    />
                </ListItem>): <ListItem>
                    <ListItemText>
                        No Team to Display
                    </ListItemText>
                </ListItem>
            }
        </List>
    )

    return (
        <Box style={{
            backgroundColor: '#eceff4',
            display: "flex",
            height: '100%'
            }} 
        sx = {{flexGrow: 1}}
        > 
        <Grid container spacing={1} direction='row'>
            <Grid item xs={3}>
                {teamListView}  
            </Grid>
            <Grid item xs={2}>
                {averageStats(team.team.team)}  
            </Grid>
            <Grid item xs={7}>
                {resistancesTable}  
            </Grid>
            

        </Grid>
        </Box>  
    )
}
const mapStateToProps = state => {
    return {
        team: state.team
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removePokemonFromTeam: (pokemon, oldTeam) => dispatch(removePokemonFromTeam(pokemon, oldTeam))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TeamContainer)