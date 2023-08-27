import {ADD_POKEMON_TO_TEAM, REMOVE_POKEMON_FROM_TEAM} from "./teamTypes"

export const addPokemonToTeam = (pokemon, oldTeam) => {
    let newTeam = oldTeam
    newTeam.push(pokemon)
    let newTeamStats = calculateStatAverages(newTeam)
    console.log(newTeamStats)
    return {
        type: ADD_POKEMON_TO_TEAM,
        payload: {
            newTeam: newTeam,
            newTeamStats: newTeamStats
        }
    }
}

export const removePokemonFromTeam = (pokemon, oldTeam) => {
    let newTeam = oldTeam
    const index = newTeam.indexOf(pokemon)
    if (index > -1) { 
        newTeam.splice(index, 1)
    }
    let newTeamStats = calculateStatAverages(oldTeam)
    return {
        type: REMOVE_POKEMON_FROM_TEAM,
        payload: {
            newTeam: newTeam,
            newTeamStats: newTeamStats
        }
    }
}

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
            sp_atk += pokemon.sp_atk;
            sp_def += pokemon.sp_def;
            speed += pokemon.speed;
            bst = pokemon.total
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
    }
     

}
