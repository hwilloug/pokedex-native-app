import { useQuery } from "@tanstack/react-query";


export default function useEvolutions(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['evolutions', id],
    queryFn: () => fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`).then(res => res.json()),
  });

  return { data, isLoading, error };
}

export function useGetEvolutionDetail(chain: any): string | number | undefined {
  const evolution_type = chain?.evolution_details[0]?.trigger?.name;
  console.log(evolution_type);
  switch (evolution_type) {
    case "level-up":
      return chain?.evolution_details[0]?.min_level;
    case "trade":
      return chain?.evolution_details[0]?.trade_species?.name;
    case "use-item":
      return chain?.evolution_details[0]?.item?.name;
    case "shed":
      return chain?.evolution_details[0]?.shed_item?.name;
    case "spin":
      return chain?.evolution_details[0]?.spin_item?.name;
    case "tower-of-darkness":
      return chain?.evolution_details[0]?.min_happiness;
    case "tower-of-waters":
      return chain?.evolution_details[0]?.min_happiness;
    case "three-critical-hits":
      return chain?.evolution_details[0]?.min_happiness;
    case "take-damage":
      return chain?.evolution_details[0]?.min_happiness;
    case "other":
      return chain?.evolution_details[0]?.min_happiness;
    case "agile-style-move":
      return chain?.evolution_details[0]?.min_happiness;
    case "strong-style-move":
      return chain?.evolution_details[0]?.min_happiness;
    case "recoil-damage":
      return chain?.evolution_details[0]?.min_happiness;
    case "trade-holding-item":
      return chain?.evolution_details[0]?.min_happiness;
    case "gender":
      return chain?.evolution_details[0]?.gender;
    case "friendship":
      return chain?.evolution_details[0]?.min_happiness;
    case "friendship-night":
      return chain?.evolution_details[0]?.min_happiness;
    default:
      return
  }
}
