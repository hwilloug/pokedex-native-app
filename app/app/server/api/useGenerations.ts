
import { useQuery } from "@tanstack/react-query";

export default function useGenerations() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["generations"],
        queryFn: () => fetch("https://pokeapi.co/api/v2/generation").then(res => res.json()),
    });

    return { data, isLoading, error };
}