
import { useQuery } from "@tanstack/react-query";

export default function usePokedex() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["pokedex"],
        queryFn: () => fetch("https://pokeapi.co/api/v2/pokedex").then(res => res.json())
    })

    return { data, isLoading, error }
}