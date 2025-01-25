import { useQuery } from "@tanstack/react-query"


export default function usePokemon(name: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["pokemon", name],
        queryFn: () => fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res => res.json())
    })
    return { data, isLoading, error }
}


// export default function usePokemon(name: string) {
//     const db = useSQLiteContext();
//     const { data, isLoading, error } = useQuery({
//         queryKey: ["pokemon", name],
//         queryFn: () => db.getFirstAsync<Pokemon>('SELECT * FROM pokemon WHERE name = ? LIMIT 1', [name])
//     })
//     return { data, isLoading, error }
// }