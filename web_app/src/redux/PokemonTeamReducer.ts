import { createPokemonTeam, getPokemonById } from "../api"
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { pokemon, stats, defensive_coverage, pokemon_team } from "../interfaces"

export const createTeam = createAsyncThunk(
    'CREATE_POKEMON_TEAM',
    async(team: pokemon_team, thunkAPI) => {
        const response = await createPokemonTeam(team)
        return response.data
    }
)
export const fetchPokemonByID = createAsyncThunk(
    'FETCH_POKEMON_BY_ID',
    async(pokemon_id: number, thunkAPI) => {
        const response = await getPokemonById(pokemon_id)
        return response.data
    }
)


interface PokemonTeamState {
    team: pokemon[]
    stats: stats
    loading: 'pending' | 'success' | 'failed' | 'idle'
}

export const emptyStats: stats = {
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0,
    base_stat_total: 0,
}

const emptyPokemon: pokemon = {
    dex_num: -1, 
    name: "None",
    primary_type: "None", 
    secondary_type: "None",
    defensive_coverage: null,
    stats: emptyStats
}


const initialState = {
    team: [
        emptyPokemon,
        emptyPokemon,
        emptyPokemon,
        emptyPokemon,
        emptyPokemon,
        emptyPokemon
    ],
    stats: {
        hp: 0,
        attack: 0,
        defense: 0,
        special_attack: 0,
        special_defense: 0,
        speed: 0,
        base_stat_total: 0,
    },
    loading: 'idle',
} as PokemonTeamState

const analyzeStats = (team: pokemon[]) => {
    const averageStats: stats = {
        hp: 0,
        attack: 0,
        defense: 0,
        special_attack: 0,
        special_defense: 0,
        speed: 0,
        base_stat_total: 0
    }
    var count: number = 0
    team.forEach((p: pokemon) => {
        if (p.dex_num != -1) {
            averageStats.hp += p.stats.hp
            averageStats.attack += p.stats.attack
            averageStats.defense += p.stats.defense
            averageStats.special_attack += p.stats.special_attack
            averageStats.special_defense += p.stats.special_defense
            averageStats.speed += p.stats.speed
            averageStats.base_stat_total += p.stats.base_stat_total
            count += 1
        }
    })
    averageStats.hp /= count
    averageStats.attack /= count
    averageStats.defense /= count
    averageStats.special_attack /= count
    averageStats.special_defense /= count
    averageStats.speed /= count
    averageStats.base_stat_total /= count
    return averageStats

}



export const pokemonTeamSlice = createSlice({
    name: 'pokemonTeam',
    initialState,
    reducers: {
        addPokemonToTeam: (state, action) => {
            state.team[action.payload.index] = action.payload.pokemon
            state.stats = analyzeStats(state.team)
        },
    }
})

export const { addPokemonToTeam, } = pokemonTeamSlice.actions
export default pokemonTeamSlice.reducer;




