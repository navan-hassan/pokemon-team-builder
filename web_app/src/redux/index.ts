import { configureStore } from "@reduxjs/toolkit";
import PokemonReducer from "./PokemonReducer";
import PokemonListReducer from "./PokemonListReducer";
import PokemonTeamReducer from "./PokemonTeamReducer";



export const store = configureStore({
    reducer: {
        Pokemon: PokemonReducer,
        PokemonList: PokemonListReducer,
        PokemonTeam: PokemonTeamReducer
    }
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch