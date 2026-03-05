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
    const updateSelectedItems = (checked: boolean, option: string) => {
        if (type === 'checkbox') {
            let selectedOptionsCopy = [...selectedOptions];
            if (checked) {
                selectedOptionsCopy.push(option);
            } else {
                selectedOptionsCopy.splice(selectedOptionsCopy.indexOf(option), 1)
            }
            updater(selectedOptionsCopy);
        } else {
            if (checked) {
                updater(option);
            } else {
                updater('');
            }
        }
    }
    return (
        <div className='dropdownContainer'>
            <button className={`dropdownButton btnOutline ${dropdownOpen ? 'dropdownOpen' : 'dropdownClosed'}`} onClick={() => updatedropdownOpenList(id)}>{dropdownOpen ? 'Close' : 'Open'} {placeholder}</button>
            {dropdownOpen && (
                <div className='dropdownListContainer'>
                    <ul className='dropdownList'>
                        {options.map(option => {
                            return (
                                <li key={option} className={`${dropdownClass} ${selectedOptions.includes(option) ? 'dropdownChecked' : 'dropdownUnchecked'}`}>
                                    <label className='dropdownListItemLabel'>
                                        <input
                                            type='checkbox'
                                            className='hiddenCheckbox'
                                            onChange={(e) => updateSelectedItems(e.target.checked, option)}
                                            checked={selectedOptions.includes(option)}
                                        />
                                        {option}
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}