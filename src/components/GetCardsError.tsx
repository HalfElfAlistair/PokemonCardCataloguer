export const GetCardsError = ({ isSearch }: { isSearch: boolean }) => {
    return (
        <div className='flex-center'>
            <p className='errorText'>Error: failed to retrieve cards from {isSearch ? 'pokemontcg.io' : 'your collection'}</p>
        </div>
    )
}