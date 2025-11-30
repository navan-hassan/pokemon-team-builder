
import typeColors from './colors.json'

export const typeList:string[] = [
    "normal",
    "fire",
    "water",
    "grass",
    "flying",
    "fighting",
    "poison",
    "electric",
    "ground",
    "rock",
    "psychic",
    "ice",
    "bug",
    "ghost",
    "steel",
    "dragon",
    "dark", 
    "fairy"
]

export interface colorList {
    [key: string]:string
}

export const colors:colorList = {
	'normal': typeColors.normal,
	'fire': typeColors.fire,
	'water': typeColors.water,
	'electric': typeColors.electric,
	'grass': typeColors.grass,
	'ice': typeColors.ice,
	'fighting': typeColors.fighting,
	'poison': typeColors.poison,
	'ground': typeColors.ground,
	'flying': typeColors.flying,
	'psychic': typeColors.psychic,
	'bug': typeColors.bug,
	'rock': typeColors.rock,
	'ghost': typeColors.ghost,
	'dragon': typeColors.dragon,
	'dark': typeColors.dark,
	'steel': typeColors.steel,
	'fairy': typeColors.fairy,
    "Normal": typeColors.normal,
	"Fire": typeColors.fire,
	"Water": typeColors.water,
	"Electric": typeColors.electric,
	"Grass": typeColors.grass,
	"Ice": typeColors.ice,
	"Fighting": typeColors.fighting,
	"Poison": typeColors.poison,
	"Ground": typeColors.ground,
	"Flying": typeColors.flying,
	"Psychic": typeColors.psychic,
	"Bug": typeColors.bug,
	"Rock": typeColors.rock,
	"Ghost": typeColors.ghost,
	"Dragon": typeColors.dragon,
	"Dark": typeColors.dark,
	"Steel": typeColors.steel,
	"Fairy": typeColors.fairy,
};

export const emptySprite:string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'