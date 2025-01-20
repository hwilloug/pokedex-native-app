import { useQuery } from "@tanstack/react-query"


export default function useVersions() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["versions"],
        queryFn: () => fetch(`https://pokeapi.co/api/v2/version?limit=50`).then(res => res.json())
    })

    return { data, isLoading, error }
}