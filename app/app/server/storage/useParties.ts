import { StorageKeys } from "@/app/utils/storage-enums";
import { storeData, useGetStorage } from "./useStorage";
import { v4 as uuid } from "uuid";

export const useGetParties = () => {
    const parties = useGetStorage(StorageKeys.PARTIES);
    return {parties: JSON.parse(parties ?? "{}")};
}

export const useGetParty = (partyId: string) => {
  const parties = useGetStorage(StorageKeys.PARTIES);
  const parsedParties = JSON.parse(parties ?? "{}");

  if (partyId === "new") {
    return { party: null };
  }

  return parsedParties.find((id: string) => id === partyId);
}

export const useCreateParties = () => {
    const partyId = uuid();
    const parties = useGetStorage(StorageKeys.PARTIES);
    const parsedParties = JSON.parse(parties ?? "{}");
    parsedParties.push(partyId);
    storeData(StorageKeys.PARTIES, JSON.stringify(parsedParties));
    return partyId;
}

export const useUpdateParties = (partyId: string, party: any) => {
    const parties = useGetStorage(StorageKeys.PARTIES);
    const parsedParties = JSON.parse(parties ?? "{}");
    parsedParties[partyId] = party;
    storeData(StorageKeys.PARTIES, JSON.stringify(parsedParties));
}

export const useDeleteParties = (partyId: string) => {
    const parties = useGetStorage(StorageKeys.PARTIES);
    const parsedParties = JSON.parse(parties ?? "{}");
    const newParties = parsedParties.filter((id: string) => id !== partyId);
    storeData(StorageKeys.PARTIES, JSON.stringify(newParties));
}