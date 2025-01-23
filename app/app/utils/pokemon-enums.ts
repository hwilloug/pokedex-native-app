

export interface EvolutionDetail {
    item: {
        name: string;
        url: string;
    },
    trigger: {
        name: string;
        url: string;
    },
    gender: number;
    held_item: {
        name: string;
        url: string;
    },
    time: number;
    turn_upside_down: boolean;
    known_move: {
        name: string;
        url: string;
    },
    known_move_type: {
        name: string;
        url: string;
    },
    min_level: number;
    min_happiness: number;
    min_beauty: number;
    min_affection: number;
    relative_physical_stats: number;
    party_species: {
        name: string;
        url: string;
    },
    trade_species: {
        name: string;
        url: string;
    },
    needs_overworld_rain: boolean;
}