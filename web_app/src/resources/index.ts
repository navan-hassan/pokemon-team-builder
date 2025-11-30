
import { types } from './types.json';

export type PokemonType = {
	text: string;
	color: string;
};

export const asTitle = (str: string): string  => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const pokemonTypeList: PokemonType[] = types.map((t) => ({
  text: t.text,
  color:t.color,
}));

export type PokemonTypeMap = Record<string, PokemonType>;

export const pokemonTypeMap: PokemonTypeMap = pokemonTypeList.reduce((dict: PokemonTypeMap , t: PokemonType) => {
	dict[t.text] = t;
	return dict;
}, {} as PokemonTypeMap);

export const getPokemonType = (typeName: string): string => {
	let pokemonType: PokemonType = pokemonTypeMap[typeName.toLowerCase()];
	return pokemonType ? pokemonType.text : "Undefined"
};

export const getPokemonTypeColor = (typeName: string): string => {
	let pokemonType: PokemonType = pokemonTypeMap[typeName.toLowerCase()];
	return pokemonType ? pokemonType.color : "black"
};

export const emptySprite: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'