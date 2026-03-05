export const SubmitInput = ({ disabled }: { disabled: boolean }) => {
    return (
        <div className='textInputContainer'>
            <input
                type='submit'
                className={`btn btnOutline ${disabled ? 'btnDisabled' : 'btnOutlinehover'}`}
                aria-disabled={disabled}
            />
        </div>
    )
}