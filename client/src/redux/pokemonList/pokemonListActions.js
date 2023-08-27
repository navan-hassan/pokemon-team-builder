import {FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE} from "./pokemonListTypes"
import { getAllPokemon } from "../../api"


const fetchListRequest = () => {
    return {
        type: FETCH_LIST_REQUEST
    }
}

const fetchListSuccess = pokemonList => {
    return {
        type: FETCH_LIST_SUCCESS,
        payload: pokemonList
    }
}

const fetchListFailure = error => {
    return {
        type: FETCH_LIST_FAILURE,
        payload: error
    }
}

export const fetchAllPokemon = () => {
    return (dispatch) => {
        dispatch(fetchListRequest)
        getAllPokemon()
        .then(response => {
            const pokemonList = response.data
            dispatch(fetchListSuccess(pokemonList.pokemon))
        })
        .catch(error => {
            const errorMsg = error.message
            dispatch(fetchListFailure(errorMsg))
        })
    }
}