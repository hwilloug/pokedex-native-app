import { useQuery } from "@tanstack/react-query";


export default function useTypes() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["types"],
        queryFn: () => fetch("https://pokeapi.co/api/v2/type").then(res => res.json()),
    });

    return { data, isLoading, error };
}