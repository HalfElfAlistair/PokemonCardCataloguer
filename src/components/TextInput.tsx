import { SearchIcon } from "../assets/svg/SearchIcon";
import { useSortFilterStates } from '../state/sortFilterContext';
interface TextInputProps {
    formID: string;
    inputType: string;
    labelText: string;
    inputClass: string;
    placeholderText: string;
    inputValue: string;
    updateFunction: Function;
    validFormat: boolean;
    formatMessage: string;
}

export const TextInput = ({ formID, inputType, labelText, inputClass, placeholderText, inputValue, updateFunction, validFormat, formatMessage }: TextInputProps) => {
    const { updateSearchText } = useSortFilterStates();
    const searchButtonText = 'Press to search for entered card name or id';
    const returnTextInput = () => {
        return (
            <input
                id={formID}
                type={inputType}
                placeholder={placeholderText}
                value={inputValue}
                onChange={(e) => updateFunction(e.target.value)}
                className={`${inputClass} ${validFormat && validFormat ? '' : 'invalidFormat'}`}
                title={validFormat ? '' : formatMessage}
            />
        )
    }
    return (
        <div className='textInputContainer'>
            {formID !== 'cardSearch' && <label htmlFor={formID} className='textInputLabel'>{labelText}</label>}
            {formID === 'cardSearch' ? (
                <div className='flex w-100 cardSearchContainer'>
                    {returnTextInput()}
                    <button
                        className='btnTransparent searchButton'
                        onClick={() => updateSearchText(inputValue)}
                        title={searchButtonText}
                        aria-label={searchButtonText}
                    >
                        <SearchIcon iconClass='buttonIcon' />
                    </button>
                </div>
            ) : (
                returnTextInput()
            )}
        </div>
    )
}