import axios from 'axios';
import { pokemon,pokemon_team } from '../interfaces';
//const axios = require('axios');

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/pokemon/',
})

export const getPokemonById = (id: number) => api.get(`/id/${id}`)
export const getAllPokemon = () => api.get(`/all`)
export const createPokemonTeam = (team: pokemon_team) => api.post(`/team`, team)

const apis = {
    getPokemonById,
    getAllPokemon
}

export default apis
