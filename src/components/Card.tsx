import { useAuth } from '../state/auth-context';
import { useUserData } from '../state/cardsDataQuery';
import { useData } from '../state/cardsDataContext';
import { useState } from "react";
import { CardModal } from "./CardModal";
import { useSortFilterStates } from '../state/sortFilterContext';
interface cardProps {
    cardID: string
    cardClass: string;
}
export const Card = ({ cardID, cardClass }: cardProps) => {

    // gets auth user
    const { user } = useAuth();
    // gets demo data
    const { data: demoData, setData } = useData();
    // gets firestore data
    const { data: userData } = useUserData();
    // Conditional determines whether user logged in to use data from firestore or demo data
    const dataToUse = user ? userData : demoData;

    const { searchText } = useSortFilterStates();

    const { owned, unobtained } = dataToUse;
    let cardsObject = { ...owned };
    if (searchText.length > 0) {
        cardsObject = { ...owned, ...unobtained }
    }

    const [cardModalOpen, setCardModalOpen] = useState(false);
    const updateCardModalOpen = () => {
        setCardModalOpen(!cardModalOpen)
    }

    return (
        <>
            <div className='cardContainerSmall' onClick={() => updateCardModalOpen()}>
                {cardID !== 'empty' && (
                    <img
                        src={cardsObject[cardID].images.small}
                        className={cardClass}
                        alt={`Picture of ${cardsObject[cardID].name} card, id: ${cardsObject[cardID].id}`}
                    />
                )}
            </div>

            {cardModalOpen && (
                <CardModal cardID={cardID} updateCardModalOpen={updateCardModalOpen} />
            )}
        </>

    );
}