import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/pokemon/',
})

export const getPokemonById = (id) => api.get(`/id/${id}`)
export const getAllPokemon = () => api.get(`/all`)
/*
export const getPokemonByHP = (amount) => api.get(`/pokemon/hp/${amount}`)
export const getPokemonByAttack = (amount) => api.get(`/pokemon/attack/${amount}`)
export const getPokemonByDefense = (amount) => api.get(`/pokemon/defense/${amount}`)
export const getPokemonBySpAtk = (amount) => api.get(`/pokemon/spatk/${amount}`)
export const getPokemonBySpDef = (amount) => api.get(`/pokemon/spdef/${amount}`)
export const getPokemonBySpeed = (amount) => api.get(`/pokemon/speed/${amount}`)
export const getPokemonByBST = (amount) => api.get(`/pokemon/bst/${amount}`)
*/

const apis = {
    getPokemonById,
    getAllPokemon
}

export default apis
