import React, { useState } from "react";
import TextInputContainer from "$components/TextInputContainer";
import Dropdown from "$components/Dropdown";
import useAutocomplete from "$hooks/useAutocomplete";
import { clamp } from "$utils/common";
import {
    Callback,
    LocationData,
    AutocompleteData,
} from "$types/common";
import "./DropdownSearch.scss";

type PropsType = {
    onBeginLoadingAutocompleteData: Callback;
    onEndLoadingAutocompleteData:   Callback<[LocationData]>;
}

export default function DropdownSearch(props: PropsType) {
    const { onBeginLoadingAutocompleteData, onEndLoadingAutocompleteData } = props;

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

        onBeginLoadingAutocompleteData();

        try {
            const data = await onEnter(value);
            onEndLoadingAutocompleteData(data[0]);
        } catch (error) {
            /* @Todo: Handle 404. */
        }
    }

    const normalizedIndex = (selected: number) => {
        return clamp(selected, -1, autocompleteData.length - 1);
    }

    const handleInputArrowUp = () => {
        if (autocompleteData.length === 0) {
            return;
        }

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
        if (autocompleteData.length === 0) {
            return;
        }

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

        const current = autocompleteData[selected].city;
        const typed = inputValue.typed;
        setInputValue({current, typed});

        onBeginLoadingAutocompleteData();
        onEndLoadingAutocompleteData(autocompleteData[selected]);
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
