import { SortFilterModal } from "./SortFilterModal";
import { useSortFilterStates } from '../state/sortFilterContext';
import { GalleryModalToggle } from './GalleryModaToggle';

export const GallerySearch = () => {

    const { sortFilterModalOpen } = useSortFilterStates();

    return (
        <div className='flex justify-center flex-wrap gallerySearch'>
            <GalleryModalToggle />
            {sortFilterModalOpen && (
                <SortFilterModal />
            )}
        </div>
    )
}