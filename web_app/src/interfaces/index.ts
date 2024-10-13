export interface pokemon {
    dex_num: number 
    name: string
    primary_type: string 
    secondary_type: string
    defensive_coverage: defensive_coverage | null
    stats: stats
}

export interface stats {
    hp: number
    attack: number
    defense: number
    special_attack: number
    special_defense: number
    speed: number
    base_stat_total: number
}

export interface pokemon_team {
    [key: number]: (pokemon | null)
}
/*
export interface defensive_coverage {
    normal: number,
    fire: number,
    water: number,
    grass: number,
    flying: number,
    fighting: number,
    poison: number,
    electric: number,
    ground: number,
    rock: number,
    psychic: number,
    ice: number,
    bug: number,
    ghost: number,
    steel: number,
    dragon: number,
    dark: number,
    fairy: number
}
*/

export interface defensive_coverage {
    [key: string]: number
}
