import { useQuery } from "@tanstack/react-query";


export default function usePokemonSpecies(name: string) {
    return useQuery({
        queryKey: ["pokemon-species", name],
        queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`).then(res => res.json()),
    });
}