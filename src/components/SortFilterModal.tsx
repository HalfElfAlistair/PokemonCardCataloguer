import { Dropdown } from "./Dropdown";
import { useSortFilterStates } from '../state/sortFilterContext';
import { TextInput } from "./TextInput";
import { useState } from "react";
import { useAuth } from '../state/auth-context';
import { getPlaceholderText } from '../helpers';
import { useLocation } from '@tanstack/react-router';
export const SortFilterModal = () => {

    const { user } = useAuth();
    const { pathname } = useLocation();

    const { dropdownOpenList, searchText, defaultTypes, filterByType, setFilterByType, defaultStages, filterByStage, setFilterByStage, sortOptions, sortBy, updateSortBy } = useSortFilterStates();

    const [inputText, setinputText] = useState(searchText ? searchText : "");
    const updateInputText = (val: string) => {
        setinputText(val);
    }

    return (
        <div className={`sortFilterModal ${pathname === '/search' ? 'sortFilterModalSearch' : 'sortFilterModalGallery'}`}>
            <div className='modalContentContainer'>
                <div className='modalContentInnerContainer'>
                    <div className='searchSortContainer'>
                        <div className='modalSection modalSearch'>
                            <h2>Search</h2>
                            <TextInput
                                formID='cardSearch'
                                inputType='text'
                                labelText='Enter card name or code, then press the search button'
                                inputClass='searchTextInput'
                                placeholderText={getPlaceholderText(user ? true : false, window.innerWidth, 'name')}
                                inputValue={inputText}
                                updateFunction={updateInputText}
                                validFormat={true}
                                formatMessage=''
                            />
                        </div>
                        <div className='modalSection modalSort'>
                            <h2 className='modalHeadings'>Sort</h2>
                            <Dropdown
                                id='sortSelect'
                                type='radio'
                                placeholder='Sort By'
                                options={sortOptions}
                                selectedOptions={[`${sortBy}`]}
                                updater={updateSortBy}
                                dropdownClass='dropdownListItem'
                                dropdownOpen={dropdownOpenList.sortSelect}
                            />
                        </div>
                    </div>

                    <div className='modalSection modalFilter'>
                        <h2 className='modalHeadings'>Filter</h2>
                        <Dropdown
                            id='typeFilter'
                            type='checkbox'
                            placeholder='Types'
                            options={defaultTypes}
                            selectedOptions={filterByType}
                            updater={setFilterByType}
                            dropdownClass='dropdownListItem'
                            dropdownOpen={dropdownOpenList.typeFilter}
                        />

                        <Dropdown
                            id='stageFilter'
                            type='checkbox'
                            placeholder='Stages'
                            options={defaultStages}
                            selectedOptions={filterByStage}
                            updater={setFilterByStage}
                            dropdownClass='dropdownListItem'
                            dropdownOpen={dropdownOpenList.stageFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}