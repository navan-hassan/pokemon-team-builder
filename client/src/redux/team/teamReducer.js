import {ADD_POKEMON_TO_TEAM, REMOVE_POKEMON_FROM_TEAM} from './teamTypes'

const intitalStatAverages = {
    hp: 0.0,
    attack: 0.0,
    defense: 0.0,
    sp_atk: 0.0,
    sp_def: 0.0,
    speed: 0.0,
    bst: 0.0
}

const initialState = {
    team: [],
    statAverages: {
        hp: 0.0,
        attack: 0.0,
        defense: 0.0,
        sp_atk: 0.0,
        sp_def: 0.0,
        speed: 0.0,
        bst: 0.0
    },
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POKEMON_TO_TEAM:
            return {
                team: action.payload.newTeam,
                statAverages: action.payload.newTeamStats
            }
        case REMOVE_POKEMON_FROM_TEAM:
            return {
                team: action.payload.newTeam,
                statAverages: action.payload.newTeamStats
            }
        default: return state
    }
}

export default reducer
