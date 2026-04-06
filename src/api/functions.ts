import axios from "axios";
import type { Card } from "../types/dataTypes";
import { fetchCardByID, addCard } from "../firebase/db";

const devPath: string = import.meta.env.VITE_NETLIFY_FUNCTIONS_URL;

type APIParams = {
    idToken: string;
}

type CardSearchParams = APIParams & {
    searchString: string;
}

type FirebaseParams = {
    uid: string;
}

type FirebaseCardParams = FirebaseParams & {
    cardID: string;
    countModifier?: number;
    cardData?: Card;
    idToken?: string;
}

export const searchbyName = async ({ idToken, searchString }: CardSearchParams) => {
    return await axios.get(`${devPath}/get-cards-by-name?name=${searchString}`, {
        headers: {
            "Authorization": `Bearer ${idToken}`,
        },
    })
}

export const searchbyID = async ({ idToken, searchString }: CardSearchParams) => {
    return await axios.get(`${devPath}/get-card-by-id?id=${searchString}`, {
        headers: {
            "Authorization": `Bearer ${idToken}`,
        },
    })
}

export const checkDBAndAddNewCard = async ({ idToken, uid, cardID, countModifier }: FirebaseCardParams) => {
    // checks db for record of card, if not present then adds it
    // may be able to run this process by just checking through data (as cards already collected from db), but if the data presents in batches, once there are lots of cards stored, this may not work. Research to see if it will work, as would be better if it does.
    const cardFromDB = await fetchCardByID(uid, cardID);
    if (cardFromDB) {
        return;
    } else {
        if (!idToken) {
            return 'error';
        }
        const searchResult = await searchbyID({ idToken, searchString: cardID });
        let cardData = { ...searchResult['data'] };
        cardData.count = countModifier;
        // card can be added asynchronously
        addCard(uid, cardID, cardData);
    }
}