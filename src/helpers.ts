import type { Cards } from "./types/dataTypes";

export const getPlaceholderText = (userLoggedIn: boolean, windowWidth: number, searchFormat: string) => {
    if (userLoggedIn) {
        return `Card ${searchFormat}`;
    } else {
        return `${windowWidth > 380 ? 'Try searching for' : 'Search'} ${searchFormat === 'id' ? 'sv3pt5-93' : 'Haunter'}`
    }
}

type filterCardsParams = {
    cardsData: Cards;
    searchText: string;
    filterByType: string[];
    defaultTypes: string[];
    filterByStage: string[];
    sortBy: string | null;
    searchFormat: string | null;
    idToken: string | null;
}

export const filterCards = ({ cardsData, searchText, filterByType, defaultTypes, filterByStage, sortBy, searchFormat, idToken }: filterCardsParams) => {

    return Object.keys(cardsData)
        .filter(cardID => {
            let cardValidity: boolean = true;
            const card = cardsData[cardID];
            const { category, name, id, types, stage, count } = card;

            // Should only show cards that aren't part of collection, if searched for
            if (searchText.length < 1 && count < 1) {
                cardValidity = false;
            }

            if (cardValidity && searchText.length > 0) {

                const lowerCaseSearchText = searchText.toLowerCase();
                const lowerCaseName = name.toLowerCase();
                const lowerCaseID = id.toLowerCase();

                const checkSearchValidity = (lowerCaseFormat: string) => {
                    return lowerCaseFormat.search(lowerCaseSearchText) < 0;
                }

                // search card name and/or ID
                if (searchFormat) {
                    if (
                        searchFormat === 'id' && checkSearchValidity(lowerCaseID)
                        ||
                        searchFormat === 'name' && checkSearchValidity(lowerCaseName)
                    ) {
                        cardValidity = false;
                    }
                } else {
                    if (checkSearchValidity(lowerCaseName) && checkSearchValidity(lowerCaseID)) {
                        cardValidity = false;
                    }
                }
            }

            if (cardValidity && filterByType.length > 0) {
                if (types) {
                    // filter pokemon by type
                    for (const type of types) {
                        if (!filterByType.includes(type)) {
                            cardValidity = false;
                            break;
                        }
                    }
                } else if (category === 'Energy') {
                    // get energy type from name and filter with that
                    let type: string = '';
                    for (const defaultType of defaultTypes) {
                        if (name.match(defaultType)) {
                            type = defaultType;
                            break;
                        }
                    }
                    if (!filterByType.includes(type)) {
                        cardValidity = false;
                    }
                } else {
                    cardValidity = false;
                }
            }

            // ignores energy cards when searching by stage, will likely add a version for energies at some point though
            if (cardValidity && filterByStage.length > 0) {
                if (category === 'Pokemon' && stage) {
                    if (!filterByStage.includes(stage)) {
                        cardValidity = false;
                    }
                } else {
                    cardValidity = false;
                }
            }
            return cardValidity;
        })
        .sort((a: string, b: string) => {
            const nameCheck = (c: string, d: string) => {
                return cardsData[c].name.toLowerCase().localeCompare(cardsData[d].name.toLowerCase());
            }
            if (sortBy) {
                return sortBy === 'Name: A-Z' ? nameCheck(a, b) : nameCheck(b, a);
            } else {
                return a.localeCompare(b);
            }
        })
}

export const convertImageURL = (path: string) => {
    return path + '/high.jpg';
}