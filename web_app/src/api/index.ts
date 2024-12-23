import axios from 'axios';
import { pokemon,pokemon_team } from '../interfaces';
//const axios = require('axios');

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/',
})

export const getPokemonById = (id: number) => api.get(`/pokemon?id=${id}`)
export const getAllPokemon = () => api.get(`/pokemon`)
export const createPokemonTeam = (team: Record<string, number>) => api.post(`/create`, team)

const apis = {
    getPokemonById,
    getAllPokemon
}

export default apis
