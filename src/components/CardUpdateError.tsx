import { CloseIcon } from "../assets/svg/CloseIcon"
export const CardUpdateError = ({ setCardUpdateError }: { setCardUpdateError: Function }) => {
    return (
        <div className='cardUpdateErrorContainer'>
            <div className='closeCardUpdateError'>
                <button
                    className='w-10 h-100 btnTransparent'
                    onClick={() => setCardUpdateError(false)}
                >
                    <CloseIcon iconClass='exposedIcon' />
                </button>
            </div>
            <div>
                <p className='errorText'>Error: update attempted without valid user authentication.</p>
            </div>
        </div>
    )
}