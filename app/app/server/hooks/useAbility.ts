import { useQuery } from "@tanstack/react-query";


const useAbility = (name: string) => {
  const { data } = useQuery({
    queryKey: ["ability", name],
    queryFn: () => fetch(`https://pokeapi.co/api/v2/ability/${name}`).then(res => res.json()),
  });

  return { data };
}

export default useAbility;