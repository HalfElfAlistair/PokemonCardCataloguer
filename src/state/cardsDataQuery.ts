import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./auth-context";
import type { Data, Cards, Lists } from "../types/dataTypes";
import { fetchUserCards, fetchLists, fetchUserDecks, fetchUserSets } from "../firebase/db";

export const useUserCards = (uid: string | undefined) => {
    const { idToken, authReady } = useAuth();
    // query only works once auth is complete, plus uid and idToken are obtained
    return useQuery<Cards>({
        queryKey: ["userCards", uid],
        queryFn: () => fetchUserCards(uid!),
        enabled: authReady && !!uid && !!idToken,
    });
}

export const useUserLists = (uid: string | undefined) => {
    const { idToken, authReady } = useAuth();
    // query only works once auth is complete, plus uid and idToken are obtained
    return useQuery<Lists>({
        queryKey: ["userLists", uid],
        queryFn: () => fetchLists(uid!),
        enabled: authReady && !!uid && !!idToken,
    });
}

export const useUserDecks = (uid: string | undefined) => {
    return useQuery({
        queryKey: ["userSets", uid],
        queryFn: () => fetchUserDecks(),
        enabled: !!uid,
    });
}

export const useUserSets = (uid: string | undefined) => {
    return useQuery({
        queryKey: ["userSets", uid],
        queryFn: () => fetchUserSets(),
        enabled: !!uid,
    });
}



export const useUserData = () => {
    const { user } = useAuth();
    const uid = user?.uid;
    const cardsQuery = useUserCards(uid);
    const listsQuery = useUserLists(uid);
    const decksQuery = useUserDecks(uid);
    const setsQuery = useUserSets(uid);

    const data: Data = {
        cards: cardsQuery.data ?? {},
        lists: listsQuery.data ?? {},
        decks: decksQuery.data ?? {},
        sets: setsQuery.data ?? {},
    }

    const isLoading =
        cardsQuery.isLoading ||
        listsQuery.isLoading ||
        decksQuery.isLoading ||
        setsQuery.isLoading;

    const isError =
        cardsQuery.isError ||
        listsQuery.isError ||
        decksQuery.isError ||
        setsQuery.isError;

    return {
        data,
        isLoading,
        isError,
    };
}
