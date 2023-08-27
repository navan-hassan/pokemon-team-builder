import { 
    SET_POKEMON_DISPLAY, 
    FETCH_POKEMON_REQUEST, 
    FETCH_POKEMON_SUCCESS, 
    FETCH_POKEMON_FAILURE 
} from "./pokemonTypes"


const initialState = {
    loading: false,
    pokemon: {},
    error: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_POKEMON_DISPLAY:
            return {
                ...state,
                pokemon: action.payload
            }
        case FETCH_POKEMON_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_POKEMON_SUCCESS:
            return {
                loading: false,
                pokemon: action.payload,
                error: ''
            }
        case FETCH_POKEMON_FAILURE:
            return {
                loading: false,
                pokemon: {},
                error: action.payload
            }
        default: return state
    }
}

export default reducer
