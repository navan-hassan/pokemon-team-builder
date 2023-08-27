import { combineReducers } from "redux";
import pokemonReducer  from './pokemon/pokemonReducer'
import pokemonListReducer from './pokemonList/pokemonListReducer'
import teamReducer from './team/teamReducer'

const rootReducer = combineReducers({
    pokemon: pokemonReducer,
    pokemonList: pokemonListReducer,
    team: teamReducer
})

export default rootReducer