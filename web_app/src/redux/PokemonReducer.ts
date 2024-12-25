import { getPokemonById } from "../api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { pokemon, stats, resistances } from "../interfaces"

export const fetchPokemonByID = createAsyncThunk(
    'FETCH_POKEMON_BY_ID',
    async(pokemon_id: number, thunkAPI) => {
        const response = await getPokemonById(pokemon_id)
        return response.data
    }
)


interface PokemonState {
    pokemon: pokemon | null
    stats: stats
    resistances: resistances | null
    sprite: string | null
    loading: 'pending' | 'success' | 'failed' | 'idle'
}

const initialState = {
    pokemon: null,
    stats: {
        hp: 0,
        attack: 0,
        defense: 0,
        special_attack: 0,
        special_defense: 0,
        speed: 0,
        base_stat_total: 0,
    },
    resistances: null,
    loading: 'idle',
    sprite: null
} as PokemonState

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPokemonByID.pending, (state) => {
            state.loading = 'pending'
        })
        .addCase(fetchPokemonByID.rejected, (state) => {
            state.loading = 'failed'
        })
        .addCase(fetchPokemonByID.fulfilled, (state, action) => {
            state.loading = 'success';
            state.pokemon = action.payload.pokemon;
            state.sprite = action.payload.pokemon.sprite;
            state.stats = action.payload.pokemon.stats;
            state.resistances = action.payload.pokemon.resistances;
        })
    }
})

export default pokemonSlice.reducer;




