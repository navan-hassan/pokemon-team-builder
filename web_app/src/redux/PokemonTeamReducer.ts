import { createPokemonTeam } from "../api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { pokemon, stats } from "../interfaces"

export const createTeam = createAsyncThunk(
    'CREATE_POKEMON_TEAM',
    async(team: pokemon[], thunkAPI) => {
        var pokemonTeamDictionary = formatRequest(team);
        const response = await createPokemonTeam(pokemonTeamDictionary);
        return response.data;
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
    id: -1, 
    name: "None",
    primary_type: "None", 
    secondary_type: "None",
    resistances: null,
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
        .addCase(createTeam.pending, (state) => {
            state.loading = 'pending'
        })
        .addCase(createTeam.fulfilled, (state, action) => {
            state.loading = 'success';
            state.team = [
                action.payload.team.Slot_1,
                action.payload.team.Slot_2,
                action.payload.team.Slot_3,
                action.payload.team.Slot_4,
                action.payload.team.Slot_5,
                action.payload.team.Slot_6
            ];
            state.stats = action.payload.team.stats;
        })
    }
})

export default pokemonTeamSlice.reducer;