import React, { useState, useRef } from "react";
import TextInputContainer from "$components/TextInputContainer";
import Dropdown from "$components/Dropdown";
import useAutocomplete from "$hooks/useAutocomplete";
import makeDeferrable from "$services/makeDeferrable";
import { clamp } from "$src/utils";
import {
    LocationData,
    AutocompleteData,
    Deferrable
} from "$types/common";
import "./DropdownSearch.scss";

type PropsType = {
    onStartSelect: () => void;
    onEndSelect:   (locationData: LocationData) => void;
}

export default function DropdownSearch(props: PropsType) {
    const { onStartSelect, onEndSelect } = props;

    const [autocompleteData, setAutocompleteData] = useState<AutocompleteData>([]);
    const [selected,         setSelected]         = useState(-1);
    const [dropdownIsHidden, setDropdownIsHidden] = useState(false);
    const [inputValue,       setInputValue]       = useState({current: "", typed: ""})

    const [onChange, onEnter] = useAutocomplete();

    const handleInputChange = async (value: string) => {
        setInputValue({current: value, typed: value});

        try {
            const data = await onChange(value);
            setAutocompleteData(data);
            setSelected(-1);
        } catch(error) {
            // @Todo: Handle 404.
            if (error.invalidInput) {
                setAutocompleteData([]);
                setSelected(-1);
            }
        }
    }

    const handleInputEnter = async (value: string) => {
        if (value === "") {
            return;
        }

        onStartSelect();

        try {
            const data = await onEnter(value);
            onEndSelect(data[0]);
        } catch (error) {
            /* @Todo: Handle 404. */
        }
    }

    const normalizedIndex = (selected: number) => {
        return clamp(selected, -1, autocompleteData.length - 1);
    }

    const handleInputArrowUp = () => {
        setSelected((selected) => {
            const index = normalizedIndex(selected - 1);
            const current = (index > -1) ?
                autocompleteData[index].city :
                inputValue.typed;
            const typed = inputValue.typed;
            setInputValue({current, typed});
            return index;
        });
    }

    const handleInputArrowDown = () => {
        setSelected((selected) => {
            const index = normalizedIndex(selected + 1);
            const current = autocompleteData[index].city;
            const typed = inputValue.typed;
            setInputValue({current, typed});
            return index;
        });
    }

    const handleInputClick = () => setDropdownIsHidden(false);
    const handleInputBlur  = () => setDropdownIsHidden(true);

    const handleDropdownItemClick = (selected: number) => {
        setDropdownIsHidden(true);
        onStartSelect();
        onEndSelect(autocompleteData[selected]);
    }

    const handleDropdownItemEnter = (selected: number) => {
        setSelected(selected);
    }

    const dropdownIsVisible = !dropdownIsHidden && autocompleteData.length > 0;

    return (
        <div className="DropdownSearch">
            <TextInputContainer
                onChange={handleInputChange}
                onEnter={handleInputEnter}
                onArrowUp={handleInputArrowUp}
                onArrowDown={handleInputArrowDown}
                onClick={handleInputClick}
                onBlur={handleInputBlur}
                value={inputValue.current}
                noRoundBottomCorners={dropdownIsVisible}
            />
            {dropdownIsVisible &&
                <Dropdown
                    onDropdownItemMouseClick={handleDropdownItemClick}
                    onDropdownItemMouseEnter={handleDropdownItemEnter}
                    autocompleteData={autocompleteData}
                    selectedIndex={selected}
                />
            }
        </div>
    );
}
