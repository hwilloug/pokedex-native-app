
export interface GameMapping<T> {
  game_id: number;
  data: T;
}


export interface Game {
    id: number;
    name: string;
    display_name: string;
    generation: number;
    region: string;
    version_group: string;
    version_group_id: number;
}

