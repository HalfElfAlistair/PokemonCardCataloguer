import { PlusIcon } from "../assets/svg/PlusIcon";
import { StarIcon } from "../assets/svg/StarIcon";
import { MinusIcon } from "../assets/svg/MinusIcon";
import { useAuth } from '../state/auth-context';
import { useUserData } from '../state/cardsDataQuery';
import { useData } from '../state/cardsDataContext';
import { useSortFilterStates } from '../state/sortFilterContext';
import { CloseIcon } from "../assets/svg/CloseIcon";

interface cardModalProps {
    cardID: string;
    updateCardModalOpen: Function;
}



export const CardModal = ({ cardID, updateCardModalOpen }: cardModalProps) => {

    // gets auth user
    const { user } = useAuth();
    // gets demo data
    const { data: demoData, setData } = useData();
    // gets firestore data
    const { data: userData } = useUserData();
    // Conditional determines whether user logged in to use data from firestore or demo data
    const dataToUse = user ? userData : demoData;

    const { searchText } = useSortFilterStates();

    const { owned, unobtained, lists } = dataToUse;
    let cardsObject = { ...owned };
    if (searchText.length > 0) {
        cardsObject = { ...owned, ...unobtained }
    }

    const { count, images, name, id } = cardsObject[cardID]
    const { favourites } = lists

    const updateCount = (increment: boolean) => {
        let dataToUseCopy = { ...dataToUse };
        if (increment) {
            if (count) {
                dataToUseCopy.owned[cardID]['count'] = count + 1;
            } else {
                // when no count data is present, the card and count will need to be added to the owned data
                dataToUseCopy.owned[cardID] = cardsObject[cardID];
                dataToUseCopy.owned[cardID]['count'] = 1;
                if (dataToUseCopy.unobtained[cardID]) {
                    delete dataToUseCopy.unobtained[cardID];
                }
            }

        } else {
            if (count === 1) {
                // when count is reduced to 0, the card will move from owned data to unobtained, thus not showing in gallery
                // dataToUseCopy.owned[cardID]['count'] = count - 1;
                delete dataToUseCopy.owned[cardID]['count'];
                dataToUseCopy.unobtained[cardID] = cardsObject[cardID];
                delete dataToUseCopy.owned[cardID];
            } else if (count > 1) {
                // decrements as normal
                dataToUseCopy.owned[cardID]['count'] = count - 1;
            }
        }
        if (user) {
            // update firebase
            console.log('update firebase')
        }
        setData(dataToUseCopy);
    }

    const updateFavourites = () => {
        let dataToUseCopy = { ...dataToUse };
        if (favourites.includes(cardID)) {
            dataToUseCopy.lists.favourites.splice(favourites.indexOf(cardID), 1)
        } else {
            dataToUseCopy.lists.favourites.push(cardID);
        }
        if (user) {
            // update firebase
            console.log('update firebase')
        }
        setData(dataToUseCopy);
    }

    const favouriteLabel = `Press to ${favourites.includes(cardID) ? 'remove from' : 'add to'} your favourite cards`;
    const closeModalLabel = 'Press to close this card view and return to the gallery';
    const countButtonLabel = (str: string) => {
        return `Press to ${str} the number of this card that you have`;
    }

    const cardActions = [
        {
            id: 'starIcon',
            event: updateFavourites,
            label: favouriteLabel,
            icon: <StarIcon iconClass='starIcon' favourite={favourites.includes(cardID) ? true : false} />
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
                <div className='cardContainerLarge'>
                    <img
                        src={images.large}
                        className='cardImage'
                        alt={`Picture of ${name} card, id: ${id}`}
                    />
                </div>
                <div className='cardCountContainer'>
                    {countButtons.map(item => {
                        if (typeof item === 'string') {
                            return (
                                <div key='cardCount'>
                                    <p>{count}</p>
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
    );
}