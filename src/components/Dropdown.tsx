import { useSortFilterStates } from '../state/sortFilterContext';

interface DropdownProps {
    id: string;
    type: string;
    placeholder: string;
    options: string[];
    selectedOptions: string[];
    updater: Function;
    dropdownClass: string;
    dropdownOpen: boolean;
}

export const Dropdown = ({ id, type, placeholder, options, selectedOptions, updater, dropdownClass, dropdownOpen }: DropdownProps) => {
    const { updatedropdownOpenList } = useSortFilterStates();

    const updateSelectedItems = (option: string) => {
        if (type === 'checkbox') {
            let checked = !selectedOptions.includes(option);
            let selectedOptionsCopy = [...selectedOptions];
            if (checked) {
                selectedOptionsCopy.push(option);
            } else {
                selectedOptionsCopy.splice(selectedOptionsCopy.indexOf(option), 1)
            }
            updater(selectedOptionsCopy);
        } else {
            if (selectedOptions[0] === option) {
                updater('');
            } else {
                updater(option);
            }
        }
    }
    return (
        <div className='dropdownContainer'>
            <button className={`dropdownButton btnOutline ${dropdownOpen ? 'dropdownOpen' : 'dropdownClosed'}`} onClick={() => updatedropdownOpenList(id)}>{dropdownOpen ? 'Close' : 'Open'} {placeholder}</button>
            {dropdownOpen && (
                <div className='dropdownListContainer'>
                    <div className='dropdownList'>
                        {options.map(option => {
                            return (
                                <button
                                    key={option}
                                    className={`btnTransparent ${dropdownClass} ${selectedOptions.includes(option) ? 'dropdownChecked' : 'dropdownUnchecked'}`}
                                    onClick={(e) => updateSelectedItems(option)}
                                >
                                    {option}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )
            }
        </div >
    )
}