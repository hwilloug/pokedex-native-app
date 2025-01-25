import { GameMapping } from "./games";
import { Type } from "./types";

export interface Pokemon {
    id: number;
    name: string;
    display_name: string;
    types: GameMapping<Type[]>;
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
    height: number;
    weight: number;
    capture_rate: number;
    base_experience: number;
    gender_rate: number;
    hatch_counter: number;
    growth_rate: GrowthRate;
    egg_groups: EggGroup[];
    species: string;
    sprites: Sprites;
    abilities: GameMapping<Ability[]>;
    moves: GameMapping<Move[]>;
    evolution_chain: GameMapping<EvolutionChain>;
    catch_location: GameMapping<CatchLocation>;
}

export interface Sprites {
    front_default: string;
    back_default: string;
    shiny_front_default: string;
    shiny_back_default: string;
}

export interface Ability {
    is_hidden: boolean;
    ability: {
        name: string;
        description: string;
    }
}

export interface Move {
    id: number;
    name: string;
    type: Type;
    power: number;
    accuracy: number;
    pp: number;
    priority: number;
    effect_chance: number;
    makes_contact: boolean;
    damage_class: {
        name: string;
    }
    effect: {
        name: string;
        description: string;
    }
}

export interface GrowthRate {
  name: string;
  id: number;
}

export interface EggGroup {
  name: string;
  id: number;
  display_name: string;
}

export interface EvolutionChain {
  name: string;
  id: number;
}

export interface CatchLocation {
  name: string;
  id: number;
}