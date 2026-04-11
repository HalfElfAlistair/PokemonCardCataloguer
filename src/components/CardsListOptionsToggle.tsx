import { MenuIcon } from "../assets/svg/MenuIcon";
import { CloseIcon } from '../assets/svg/CloseIcon';
import { useSortFilterStates } from '../state/sortFilterContext';

export const CardsListOptionsToggle = () => {
    const { cardsListOptionsOpen, toggleCardsListOptionsState } = useSortFilterStates();
    const labelText = `Press to ${cardsListOptionsOpen ? 'close' : 'open'} menu for search, sort, and filtering`;
    return (
        <div className='CardsListOptionsToggleContainer'>
            <button
                className='btnTransparent cardsListOptionsToggleButton'
                onClick={() => toggleCardsListOptionsState()}
                aria-label={labelText}
                title={labelText}
            >
                {cardsListOptionsOpen ? (
                    <CloseIcon iconClass='exposedIcon' />
                ) : (
                    <MenuIcon iconClass='exposedIcon' />
                )}
            </button>
        </div>

    )
}