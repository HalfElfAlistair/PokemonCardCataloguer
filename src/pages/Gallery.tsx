import { useSortFilterStates } from '../state/sortFilterContext';
import { GallerySearch } from '../components/GallerySearch';
import { CardsList } from '../components/CardsList';

export const Gallery = () => {
    const { sortFilterModalOpen } = useSortFilterStates();

    return (
        <main className="flex-center flex-wrap" role="main">
            <GallerySearch />
            {!sortFilterModalOpen && <CardsList />}
        </main>
    )
}