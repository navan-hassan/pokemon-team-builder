import {FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE} from "./pokemonListTypes"

const initialState = {
    loading: false,
    pokemonList: [],
    error: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_LIST_SUCCESS:
            return {
                loading: false,
                pokemonList: action.payload,
                error: ''
            }
        case FETCH_LIST_FAILURE:
            return {
                loading: false,
                pokemonList: [],
                error: action.payload
            }
        default: return state
    }
}

export default reducer
