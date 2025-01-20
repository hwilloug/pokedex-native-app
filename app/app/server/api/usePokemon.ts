import { useQuery } from "@tanstack/react-query"


export default function usePokemon(name: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["pokemon", name],
        queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res => res.json())
    })
    return { data, isLoading, error }
}