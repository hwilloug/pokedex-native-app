

export enum StorageKeys {
    VERSION = "version",
    FILTERS = "filters",
    PARTIES = "parties"
}

export interface Stats {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
}

export interface PartyPokemon {
    name: string;
    nickname?: string;
    moves?: string[];
    gender?: string;
    item?: string;
    ability?: string;
    nature?: string;
    ivs?: Stats;
    evs?: Stats;
    stats?: Stats;
}

export interface Party {
    pokemon: PartyPokemon[];
    version: string;
    name: string;
    description?: string;
}