import { MenuIcon } from "../assets/svg/MenuIcon";
import { CloseIcon } from '../assets/svg/CloseIcon';
import { useSortFilterStates } from '../state/sortFilterContext';

export const GalleryModalToggle = () => {
    const { sortFilterModalOpen, toggleSortFilterModal } = useSortFilterStates();
    const labelText = `Press to ${sortFilterModalOpen ? 'close' : 'open'} menu for search, sort, and filtering`;
    return (
        <button
            className='btnTransparent modalToggleButton'
            onClick={() => toggleSortFilterModal()}
            aria-label={labelText}
            title={labelText}
        >
            {sortFilterModalOpen ? (
                <CloseIcon iconClass='exposedIcon' />
            ) : (
                <MenuIcon iconClass='exposedIcon' />
            )}
        </button>
    )
}