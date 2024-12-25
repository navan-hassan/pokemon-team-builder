export interface pokemon {
    id: number 
    name: string
    primary_type: string 
    secondary_type: string
    resistances: resistances | null
    stats: stats
    sprite: string | null
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
    id: number
    slot_1: pokemon | null
    slot_2: pokemon | null
    slot_3: pokemon | null
    slot_4: pokemon | null
    slot_5: pokemon | null
    slot_6: pokemon | null
    avg_stats: stats | null
}

export interface resistances {
    [key: string]: number
}

export interface user {
    user_id: number,
    username: string,
    teams: pokemon_team[]
}