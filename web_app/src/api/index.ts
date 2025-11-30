import axios from 'axios';

import config from '../resources/config.json'
import { pokemon,pokemon_team } from '../interfaces';

const api = axios.create({
    baseURL: config.apiUrl,
})

export const getPokemonById = (id: number) => api.get(`/pokemon/id?id=${id}`)
export const getAllPokemon = () => api.get(`/pokemon/all`)
export const createPokemonTeam = (team: Record<string, number>) => api.post(`/teams/create`, team)

const apis = {
    getPokemonById,
    getAllPokemon
}

export default apis
