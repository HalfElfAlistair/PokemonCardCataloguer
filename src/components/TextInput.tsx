import { SearchIcon } from "../assets/svg/SearchIcon";
import { useSortFilterStates } from '../state/sortFilterContext';
import { useAuth } from '../state/auth-context';
import { useData } from '../state/cardsDataContext';
import { searchbyName, searchbyID } from "../api/functions";
import type { Cards } from "../types/dataTypes";
import { useLocation } from '@tanstack/react-router';
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

    // gets auth user
    const { idToken } = useAuth();
    const { data, setCardSearchData, setCardSearchStatus } = useData();
    const { cards } = data;
    const { pathname } = useLocation();

    const { searchFormat, updateSearchText } = useSortFilterStates();
    const searchButtonText = 'Press to search for entered card name or id';
    const searchButtonFunction = async (searchString: string) => {
        const lowerCaseSearchString: string = searchString.toLowerCase();
        await updateSearchText(lowerCaseSearchString);
        if (pathname === '/search') {
            if (idToken) {
                let searchResult;
                let dataToReturn;
                setCardSearchStatus('loading')
                if (searchFormat === 'id') {
                    searchResult = await searchbyID({ idToken, searchString });
                    const cardData = searchResult['data'];
                    const cardID = cardData['id'];
                    dataToReturn = { [cardID]: cardData };
                } else {
                    searchResult = await searchbyName({ idToken, searchString });
                    dataToReturn = { ...searchResult['data'] };
                }
                if (searchResult.status === 200) {
                    setCardSearchData(dataToReturn)
                    setCardSearchStatus('default')
                } else {
                    setCardSearchStatus('error')
                }
            } else {
                if (searchFormat === 'id') {
                    const card = cards[lowerCaseSearchString];
                    setCardSearchData({ [card.id]: card })
                } else {
                    let cardsMatchedByName: Cards = {};
                    for (const cardID in cards) {
                        const card = cards[cardID];
                        const { name } = card;
                        if ((name.toLowerCase().search(lowerCaseSearchString) >= 0)) {
                            cardsMatchedByName[cardID] = card;
                        }
                    }
                    setCardSearchData(cardsMatchedByName);
                }
            }
        }
    }

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
                        onClick={() => searchButtonFunction(inputValue)}
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