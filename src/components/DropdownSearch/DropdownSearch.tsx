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
    const [inputValue,       setInputValue]       = useState("");

    const lastTyped = useRef("");

    const [onChange, onEnter] = useAutocomplete();

    const handleChange = async (value: string) => {
        lastTyped.current = value;

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

    const handleEnter = async (value: string) => {
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

    // @Rename
    const handleSelectionPrevious = () => {
        setSelected((selected) => {
            const index = normalizedIndex(selected - 1);
            const value = (index > -1) ?
                autocompleteData[index].city :
                lastTyped.current;
            setInputValue(value);
            return index;
        });
    }

    // @Rename
    const handleSelectionNext = () => {
        setSelected((selected) => {
            const index = normalizedIndex(selected + 1);
            setInputValue(autocompleteData[index].city);
            return index;
        });
    }

    const handleFocus = () => setDropdownIsHidden(false);
    const handleBlur  = () => setDropdownIsHidden(true);

    const dropdownIsVisible = !dropdownIsHidden && autocompleteData.length > 0;

    return (
        <div className="DropdownSearch">
            <TextInputContainer
                onChange={handleChange}
                onEnter={handleEnter}
                onArrowUp={handleSelectionPrevious}
                onArrowDown={handleSelectionNext}
                onFocus={handleFocus}
                onBlur={handleBlur}
                text={inputValue}
                noRoundBottomCorners={dropdownIsVisible}
            />
            {dropdownIsVisible &&
                <Dropdown
                    autocompleteData={autocompleteData}
                    selectedIndex={selected}
                />
            }
        </div>
    );
}
