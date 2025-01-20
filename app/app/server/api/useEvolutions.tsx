import { useQuery } from "@tanstack/react-query";


export default function useEvolutions(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['evolutions', id],
    queryFn: () => fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`).then(res => res.json()),
  });

  return { data, isLoading, error };
}