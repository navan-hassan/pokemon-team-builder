import {FETCH_POKEMON_FAILURE, FETCH_POKEMON_REQUEST, FETCH_POKEMON_SUCCESS, SET_POKEMON_DISPLAY } from "./pokemonTypes"
import { getPokemonById } from "../../api"

export const setPokemonDisplay = pokemon_id => {
    return (dispatch) => {
        dispatch(fetchPokemonRequest)
        getPokemonById(pokemon_id)
        .then(response => {
            const pokemon = response.data
            dispatch(fetchPokemonSuccess(pokemon.pokemon[0]))
        })
        .catch(error => {
            const errorMsg = error.message
            dispatch(fetchPokemonFailure(errorMsg))
        })
    }
    /*
    return {
        type: SET_POKEMON_DISPLAY,
        payload: pokemon
    }
    */
}

const fetchPokemonRequest = () => {
    return {
        type: FETCH_POKEMON_REQUEST
    }
}

const fetchPokemonSuccess = pokemon => {
    return {
        type: FETCH_POKEMON_SUCCESS,
        payload: pokemon
    }
}

const fetchPokemonFailure = error => {
    return {
        type: FETCH_POKEMON_FAILURE,
        payload: error
    }
}

/*
export const fetchPokemonByID = (id) => {
    return (dispatch) => {
        dispatch(fetchPokemonRequest)
        getPokemonById(id)
        .then(response => {
            const pokemon = response.data
        })
        .catch(error => {
            const errorMsg = error.message
        })
    }
}*/