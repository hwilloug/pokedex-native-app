
import { useQuery } from "@tanstack/react-query";

export default function useEggGroups() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["egg-groups"],
        queryFn: () => fetch("https://pokeapi.co/api/v2/egg-group").then(res => res.json()),
    });

    return { data, isLoading, error };
}