
import { useQuery } from "@tanstack/react-query";

export default function usePokedex(pokedex?: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["pokedex", pokedex],
        queryFn: () => fetch(`https://pokeapi.co/api/v2/pokedex/${pokedex}`).then(res => res.json())
    })

    return { data, isLoading, error }
}