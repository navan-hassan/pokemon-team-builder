import { createPokemonTeam } from "../api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { pokemon, stats } from "../interfaces"

export const createTeam = createAsyncThunk(
    'CREATE_POKEMON_TEAM',
    async(team: [number, pokemon[]], thunkAPI) => {
        var pokemonTeamDictionary = formatRequest(team[1]);
        pokemonTeamDictionary['id'] = team[0]
        const response = await createPokemonTeam(pokemonTeamDictionary);
        return response.data;
    }
)

interface PokemonTeamState {
    team_id: number
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
    id: -1,
    name: "None",
    primary_type: "None",
    secondary_type: "None",
    resistances: null,
    sprite: null,
    stats: emptyStats
}


const initialState = {
    team_id: 1,
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


const formatRequest = (team: pokemon[]) => {
    var pokemonTeamDictionary: Record<string, number> = {};
    team.forEach((pkmn, index) => { pokemonTeamDictionary[`slot_${(index+1)}`] = pkmn.id; });
    return pokemonTeamDictionary;
}



export const pokemonTeamSlice = createSlice({
    name: 'pokemonTeam',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createTeam.fulfilled, (state, action) => {
            state.loading = 'success';
            state.team = [
                action.payload.team.slot_1,
                action.payload.team.slot_2,
                action.payload.team.slot_3,
                action.payload.team.slot_4,
                action.payload.team.slot_5,
                action.payload.team.slot_6
            ];
            state.stats = action.payload.team.average_stats;
        })
    }
})

export default pokemonTeamSlice.reducer;