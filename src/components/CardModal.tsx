import { PlusIcon } from "../assets/svg/PlusIcon";
import { StarIcon } from "../assets/svg/StarIcon";
import { MinusIcon } from "../assets/svg/MinusIcon";
import { useAuth } from '../state/auth-context';
import { useUserData } from '../state/cardsDataQuery';
import { useData } from '../state/cardsDataContext';
import { CloseIcon } from "../assets/svg/CloseIcon";
import { convertImageURL } from '../helpers';
import { checkDBAndAddNewCard } from "../api/functions";
import { useLocation } from '@tanstack/react-router';
import { updateCardCount, updateList } from "../firebase/db";
import { CardUpdateError } from "./CardUpdateError";
import { useState } from "react";

type CardModalProps = {
    cardID: string;
    updateCardModalOpen: Function;
}

export const CardModal = ({ cardID, updateCardModalOpen }: CardModalProps) => {

    // gets auth user
    const { user, idToken } = useAuth();
    // gets demo data
    const { data: demoData, setData, cardSearchData } = useData();
    // gets firestore data
    const { data: userData } = useUserData();
    // Conditional determines whether user logged in to use data from firestore or demo data
    const dataToUse = user ? userData : demoData;

    const { cards, lists } = dataToUse;

    const { pathname } = useLocation();
    let cardData = pathname === '/search' ? cardSearchData[cardID] : cards[cardID];
    const { count, image, name } = cardData;

    const [cardUpdateError, setCardUpdateError] = useState(false);

    const shouldCheckCardPresenceOnUpdate = count === undefined ? true : false;

    const { favourites } = lists;

    const isFavourite = favourites && favourites.cardIDs.includes(cardID);

    const updateCount = async (increment: boolean) => {
        let dataToUseCopy = { ...dataToUse };
        let uid;
        if (user) {
            uid = user['uid'];
        }
        if (increment) {
            // add card to data copy if new
            if (!dataToUseCopy['cards'][cardID]) {
                dataToUseCopy['cards'][cardID] = cardData;
            }
            if (count !== undefined) {
                dataToUseCopy['cards'][cardID]['count'] = count + 1;
            } else {
                dataToUseCopy['cards'][cardID]['count'] = 1;
            }
        } else {
            if (count > 0) {
                dataToUseCopy['cards'][cardID]['count'] = count - 1;
            }
        }
        // if logged in, update db
        if (uid && idToken) {
            if (shouldCheckCardPresenceOnUpdate) {
                const cardAdded = await checkDBAndAddNewCard({ idToken, uid, cardID, countModifier: 1 });
                if (cardAdded === 'error') {
                    setCardUpdateError(true);
                }
            } else {
                const countModifier = increment ? 1 : -1;
                const countValue = count + countModifier;
                // update firebase asynchronously
                updateCardCount(uid, cardID, countValue);
            }
        }
        setData(dataToUseCopy);
    }

    const updateFavourites = async () => {
        let uid;
        if (user) {
            uid = user['uid'];
        }
        let dataToUseCopy = { ...dataToUse };
        if (isFavourite) {
            dataToUseCopy.lists.favourites.cardIDs.splice(favourites.cardIDs.indexOf(cardID), 1)
        } else {
            dataToUseCopy.lists.favourites.cardIDs.push(cardID);
        }
        if (uid) {
            // update firebase asynchronously
            updateList(uid, "favourites", dataToUseCopy.lists.favourites)
        }
        setData(dataToUseCopy);
        if (shouldCheckCardPresenceOnUpdate) {
            if (uid && idToken) {
                const cardAdded = await checkDBAndAddNewCard({ idToken, uid, cardID, countModifier: 0 });
                if (cardAdded === 'error') {
                    setCardUpdateError(true);
                }
            }
        }
    }

    const favouriteLabel = `Press to ${isFavourite ? 'remove from' : 'add to'} your favourite cards`;
    const closeModalLabel = 'Press to close this card view and return to the gallery';
    const countButtonLabel = (str: string) => {
        return `Press to ${str} the number of this card that you have`;
    }

    const cardActions = [
        {
            id: 'starIcon',
            event: updateFavourites,
            label: favouriteLabel,
            icon: <StarIcon iconClass='starIcon' favourite={isFavourite ? true : false} />
        },
        {
            id: 'exposedIcon',
            event: updateCardModalOpen,
            label: closeModalLabel,
            icon: <CloseIcon iconClass='exposedIcon' />
        }
    ]

    const countButtons = [
        {
            buttonClass: 'countButtonLeft',
            event: false,
            disabled: count < 1,
            label: 'decrease',
            icon: <MinusIcon iconClass='buttonIcon' />
        },
        '',
        {
            buttonClass: 'countButtonRight',
            event: true,
            disabled: false,
            label: 'increase',
            icon: <PlusIcon iconClass='buttonIcon' />
        }
    ]

    return (
        <div className='cardModal'>
            <div className='cardModalContainer'>
                <div className='cardActionsContainer'>
                    <div className='cardActionsContainerInner'>
                        {cardActions.map(action => {
                            const { id, event, label, icon } = action;
                            return (
                                <button
                                    key={id}
                                    className='btnTransparent cardActionsButton'
                                    onClick={() => event()}
                                    title={label}
                                    aria-label={label}
                                >
                                    {icon}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className='cardContainerLarge'>
                    <div className='cardContainerLargeInner'>
                        <img
                            src={convertImageURL(image)}
                            className='cardImage'
                            alt={`Picture of ${name} card, id: ${cardID}`}
                        />
                    </div>
                </div>
                <div className='cardCountContainer'>
                    <div className='cardCountContainerInner'>
                        {countButtons.map(item => {
                            if (typeof item === 'string') {
                                return (
                                    <div key='cardCount'>
                                        <p>{count ? count : 0}</p>
                                    </div>
                                )
                            } else {
                                const { buttonClass, event, disabled, label, icon } = item;
                                const labelText = countButtonLabel(label);
                                return (
                                    <button
                                        key={buttonClass}
                                        className={`btnTransparent countButton ${buttonClass}`}
                                        onClick={() => updateCount(event)}
                                        disabled={disabled}
                                        title={labelText}
                                        aria-label={labelText}
                                    >
                                        {icon}
                                    </button>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
            {cardUpdateError && <CardUpdateError setCardUpdateError={setCardUpdateError} />}
        </div>
    );
}