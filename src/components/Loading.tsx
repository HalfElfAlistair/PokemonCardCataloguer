import { PokeBallIcon } from "../assets/svg/PokeBallIcon";

export const Loading = () => {
    const labelText = "Loading cards..."
    return (
        <div className='flex-center'>
            <div
                className="PokeBallAnimationContainer"
                aria-label={labelText}
                title={labelText}
            >
                <PokeBallIcon />
            </div>
        </div>
    )
}
