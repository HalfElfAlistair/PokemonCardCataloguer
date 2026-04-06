import { Card } from "./Card";
import { useAuth } from '../state/auth-context';
import { useUserData } from '../state/cardsDataQuery';
import { useData } from '../state/cardsDataContext';
import { useSortFilterStates } from '../state/sortFilterContext';
import type { Data } from "../types/dataTypes";
import { useLocation } from "@tanstack/react-router";
import { filterCards } from "../helpers";
import { Loading } from "./Loading";
import { GetCardsError } from "./GetCardsError";

export const CardsList = () => {

    // gets auth user
    const { user, authReady, idToken } = useAuth();
    // gets demo data
    const { data: demoData, cardSearchData, cardSearchStatus } = useData();
    // gets firestore data
    const { data: userData, isLoading, isError } = useUserData();
    // Conditional determines whether user logged in to use data from firestore or demo data
    const dataToUse: Data = user ? userData : demoData;
    // gets various data for filter and sorting
    const { searchFormat, searchText, defaultTypes, filterByType, filterByStage, sortBy } = useSortFilterStates();
    // check page location so that component uses relevant data to list cards from
    const { pathname } = useLocation();
    const isSearch = pathname === '/search';
    const cardsData = isSearch ? cardSearchData : dataToUse.cards;
    // produces an array of filtered and sorted cardIDs, counts then adds empty cards for formatting
    const cardIDs = isSearch ? Object.keys(cardsData) : filterCards({ cardsData, searchText, filterByType, defaultTypes, filterByStage, sortBy, searchFormat, idToken });
    const filteredCardsCount = cardIDs.length;
    const freeColumns = 3 - (filteredCardsCount % 3);
    if (freeColumns !== 0) {
        for (let i = 0; i < freeColumns; i++) {
            cardIDs.push('empty')
        }
    }

    if (isLoading || cardSearchStatus === 'loading') {
        return <Loading />
    }

    if (isError || cardSearchStatus === 'error') {
        return <GetCardsError isSearch={isSearch} />
    }

    return authReady && (
        <div className='cardsList '>
            {
                cardIDs.length > 0 && cardIDs.map((cardID, i) => {
                    return (
                        <Card key={cardID === 'empty' ? `empty${i}` : cardID} cardID={cardID} cardClass='cardImageSmall' />
                    )
                })
            }
        </div>
    )
}