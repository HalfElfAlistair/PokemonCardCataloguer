import { useAuth } from '../state/auth-context';
import { useUserData } from '../state/cardsDataQuery';
import { useData } from '../state/cardsDataContext';
import { useSortFilterStates } from '../state/sortFilterContext';
import { GallerySearch } from '../components/GallerySearch';
import { CardsList } from '../components/CardsList';

export const Gallery = () => {

    // gets auth user
    const { user } = useAuth();
    // gets demo data
    const { data: demoData, setData } = useData();
    // gets firestore data
    const { data: userData } = useUserData();
    // Conditional determines whether user logged in to use data from firestore or demo data
    const dataToUse = user ? userData : demoData;


    const { sortFilterModalOpen, searchText, defaultTypes, filterByType, filterByStage, sortBy } = useSortFilterStates();

    const lowerCaseSearchText = searchText.toLowerCase();

    const { owned, unobtained } = dataToUse;
    let cardsObject = { ...owned };
    if (searchText.length > 0) {
        cardsObject = { ...owned, ...unobtained }
    }

    const filteredCards = Object.keys(cardsObject)
        .filter(cardID => {
            let cardValidity: boolean = true;
            // const { types, supertype, name, subtypes, id } = dataToUse.owned[cardID];
            const { types, supertype, name, subtypes, id } = cardsObject[cardID];

            if (cardValidity && searchText.length > 0) {

                const lowerCaseName = name.toLowerCase();
                const lowerCaseID = id.toLowerCase();
                // search card name and ID
                if ((lowerCaseName.search(lowerCaseSearchText) < 0) && (lowerCaseID.search(lowerCaseSearchText) < 0)) {
                    cardValidity = false;
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
                } else if (supertype === 'Energy') {
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

            if (cardValidity && filterByStage.length > 0) {
                if (supertype === 'Pokémon') {
                    // filter pokemon by stage
                    for (const stage of subtypes) {
                        if (!filterByStage.includes(stage)) {
                            cardValidity = false;
                            break;
                        }
                    }
                } else {
                    cardValidity = false;
                }
            }

            return cardValidity;
        })
        .sort((a, b) => {
            // const cards = dataToUse.owned;
            const cards = cardsObject;
            if (sortBy) {
                return sortBy === 'Name: A-Z' ? cards[a].name.toLowerCase().localeCompare(cards[b].name.toLowerCase()) : cards[b].name.toLowerCase().localeCompare(cards[a].name.toLowerCase());
            }
        });

    const filteredCardsCount = filteredCards.length;

    const freeColumns = 3 - (filteredCardsCount % 3);

    if (freeColumns !== 0) {
        for (let i = 0; i < freeColumns; i++) {
            filteredCards.push('empty')
        }
    }



    return (
        <main className="flex-center flex-wrap" role="main">
            <GallerySearch />
            {!sortFilterModalOpen && <CardsList cardsToDisplay={filteredCards} />}
        </main>
    )
}