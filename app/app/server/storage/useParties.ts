import { StorageKeys } from "@/app/utils/storage-enums";
import { storeData, useGetStorage, readData } from "./useStorage";
import 'react-native-get-random-values';
import { v4 as uuid } from "uuid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetParties = () => {
    const parties = useGetStorage(StorageKeys.PARTIES);
    return {parties: JSON.parse(parties ?? "[]")};
}

export const useGetParty = (partyId: string) => {
  const parties = useGetStorage(StorageKeys.PARTIES);
  const parsedParties = JSON.parse(parties ?? "[]");
  const party = parsedParties.find((party: any) => party.id === partyId);

  return {
    party,
  };
}

export const useCreateParties = () => {
    const queryClient = useQueryClient();
    const partyId = uuid();

    const mutation = useMutation({
        mutationFn: async (party: any) => {
            const parties = await queryClient.fetchQuery({
                queryKey: ["storage", StorageKeys.PARTIES],
                queryFn: () => useGetStorage(StorageKeys.PARTIES)
            });
            const parsedParties = JSON.parse(parties ?? "[]");
            parsedParties.push({ id: partyId, ...party });
            await storeData(StorageKeys.PARTIES, JSON.stringify(parsedParties));
            return partyId;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["storage", StorageKeys.PARTIES] });
        }
    });

    return {
        ...mutation,
        mutate: (party: any) => {
            mutation.mutate(party, {
                onSuccess: () => partyId
            });
            return partyId;
        }
    };
}

export const useUpdateParties = (partyId: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (party: any) => {
            const parties = await readData(StorageKeys.PARTIES);
            const parsedParties = JSON.parse(parties ?? "[]");
            const partyIndex = parsedParties.findIndex((party: any) => party.id === partyId);
            if (partyIndex !== -1) {
                parsedParties[partyIndex] = { ...parsedParties[partyIndex], ...party };
                await storeData(StorageKeys.PARTIES, JSON.stringify(parsedParties));
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["storage", StorageKeys.PARTIES] });
        }
    });
    return mutation;
}

export const useDeleteParties = (partyId: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => {
            const parties = await queryClient.fetchQuery({
                queryKey: ["storage", StorageKeys.PARTIES],
                queryFn: () => useGetStorage(StorageKeys.PARTIES)
            });
            const parsedParties = JSON.parse(parties ?? "[]");
            const newParties = parsedParties.filter((id: string) => id !== partyId);
            await storeData(StorageKeys.PARTIES, JSON.stringify(newParties));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["storage", StorageKeys.PARTIES] });
        }
    });
    return mutation;
}