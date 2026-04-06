import { useAuth } from '../state/auth-context';
import { useSortFilterStates } from '../state/sortFilterContext';
import { useState } from "react";
import { TextInput } from '../components/TextInput';
import { CardsList } from '../components/CardsList';
import { getPlaceholderText } from '../helpers';
import { SearchFormatSelector } from '../components/SearchFormatSelector';

export const Search = () => {
    // gets auth user
    const { user } = useAuth();

    const { searchFormat, searchText } = useSortFilterStates();

    const [inputText, setinputText] = useState(searchText ? searchText : "");
    const updateInputText = (val: string) => {
        setinputText(val);
    }

    return (
        <main className="flex-center flex-wrap searchPageContainer" role="main">
            <SearchFormatSelector />
            <div className='searchPageContentContainer'>
                <TextInput
                    formID='cardSearch'
                    inputType='text'
                    labelText='Enter card name or code, then press the search button'
                    inputClass='searchTextInput'
                    placeholderText={getPlaceholderText(user ? true : false, window.innerWidth, searchFormat)}
                    inputValue={inputText}
                    updateFunction={updateInputText}
                    validFormat={true}
                    formatMessage=''
                />
            </div>
            {searchText.length > 0 && <CardsList />}
        </main>
    )
}