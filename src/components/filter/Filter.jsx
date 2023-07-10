import './filter.css'
import { ReactComponent as Down } from '../../assets/icons/chevron-down-outline.svg'
import { useState, useRef, useEffect } from 'react';
const Filter = ({ toggle, selectedOption, setSelectedOption }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = [
        { value: 'Filter by Region', label: 'Filter by Region' },
        { value: 'Africa', label: 'Africa' },
        { value: 'America', label: 'America' },
        { value: 'Asia', label: 'Asia' },
        { value: 'Europe', label: 'Europe' },
        { value: 'Oceania', label: 'Oceania' },
    ];


    const handleOptionClick = (optionValue) => {
        setSelectedOption(optionValue);
        setIsDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <section
            ref={dropdownRef}
            className={`select-list flex br-5 ${toggle ? 'dark' : 'light'}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <p className={`select-input ${isDropdownOpen ? 'open' : ''}`}>{selectedOption}</p>
            {isDropdownOpen && (
                <ul className="options-list flex flex-column w-100 br-5">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`option w-100 ${selectedOption === option.value ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
            <Down />
        </section>
    )
}

export default Filter