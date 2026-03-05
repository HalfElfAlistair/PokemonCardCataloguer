import { Card } from "./Card";
export const CardsList = ({ cardsToDisplay }: { cardsToDisplay: string[] }) => {
    return (
        <div className='cardsList '>
            {
                cardsToDisplay.map((cardID, i) => {
                    return (
                        <Card key={cardID === 'empty' ? `empty${i}` : cardID} cardID={cardID} cardClass='cardImageSmall' />
                    )
                })
            }
        </div>
    )
}