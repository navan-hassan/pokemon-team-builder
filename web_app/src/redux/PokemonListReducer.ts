import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { pokemon } from "../interfaces"
import { getAllPokemon } from "../api"

export const fetchAllPokemon = createAsyncThunk(
    'FETCH_ALL_POKEMON',
    async(_, thunkAPI) => {
        const response = await getAllPokemon()
        return response.data
    }
)




interface PokemonListState {
    pokemonList: pokemon[]
    loading: 'idle' | 'failed' | 'pending'
}

const initialState = {
    pokemonList: [],
    loading: 'idle'
} as PokemonListState

const pokemonListSlice = createSlice({
    name: 'pokemonList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllPokemon.pending, (state) => {
            state.loading = 'pending'
        })
        .addCase(fetchAllPokemon.fulfilled, (state, action) => {
            state.loading = 'idle';
            state.pokemonList = action.payload.pokemon;
        })
    }
})

export default pokemonListSlice.reducer;