import { useSortFilterStates } from '../state/sortFilterContext';
import { CardsList } from '../components/CardsList';
import { CardsListOptionsToggle } from '../components/CardsListOptionsToggle';
import { CardsListOptions } from '../components/CardsListOptions';

export const Gallery = () => {
    const { cardsListOptionsOpen } = useSortFilterStates();

    return (
        <main className="flex-center flex-wrap" role="main">
            <CardsListOptionsToggle />
            {cardsListOptionsOpen ? (
                <CardsListOptions />
            ) : (
                <CardsList />
            )}
        </main>
    )
}