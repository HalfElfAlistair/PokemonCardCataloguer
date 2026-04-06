import { useAuth } from '../state/auth-context';
import { useUserData } from '../state/cardsDataQuery';
import { useData } from '../state/cardsDataContext';
import { useState } from "react";
import { CardModal } from "./CardModal";
import { convertImageURL } from '../helpers';
import { useLocation } from '@tanstack/react-router';

interface cardProps {
    cardID: string
    cardClass: string;
}

export const Card = ({ cardID, cardClass }: cardProps) => {

    // gets auth user
    const { user } = useAuth();
    // gets demo data
    const { data: demoData, cardSearchData } = useData();
    // gets firestore data
    const { data: userData } = useUserData();
    // Conditional determines whether user logged in to use data from firestore or demo data
    const dataToUse = user ? userData : demoData;

    const { cards } = dataToUse;

    const [cardModalOpen, setCardModalOpen] = useState(false);
    const updateCardModalOpen = () => {
        setCardModalOpen(!cardModalOpen)
    }

    const { pathname } = useLocation();
    let cardData = pathname === '/search' ? cardSearchData[cardID] : cards[cardID];

    return (
        <>
            {cardID && cardID !== 'empty' ? (
                <button
                    className='btnTransparent cardContainerSmall'
                    onClick={() => updateCardModalOpen()}
                    aria-label={`Click on this card to see a larger version and some additional details`}
                >
                    <img
                        src={convertImageURL(cardData.image)}
                        className={cardClass}
                        alt={`Picture of ${cardData.name} card, id: ${cardID}`}
                    />
                </button>
            ) : (
                <div className='cardContainerSmall' />
            )}

            {cardModalOpen && (
                <CardModal cardID={cardID} updateCardModalOpen={updateCardModalOpen} />
            )}
        </>
    );
}