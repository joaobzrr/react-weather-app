import React, { useState, useEffect, KeyboardEvent } from "react";
import TextInput from "$components/TextInput";
import Dropdown from "$components/Dropdown";
import useDropdownSearch from "$hooks/useDropdownSearch";
import { LocationData } from "$src/types";
import "./DropdownSearch.scss";

type PropsType = {
    onSelect:  (locationData: LocationData) => void;
    onLoading: () => void;
}

export default function DropdownSearch(props: PropsType) {
    const { onSelect, onLoading } = props;

    const [entries, selectedIndex, handleChange, handleSelectionChange, handleSelect] = useDropdownSearch();;
    const [dropdownIsHidden, setDropdownIsHidden] = useState(false);

    const dropdownIsVisible = !dropdownIsHidden && entries.length > 0;

    const textInputContainerClasses = ["DropdownSearch_textInputContainer"];
    if (dropdownIsVisible) {
        textInputContainerClasses.push("DropdownSearch_textInputContainer__noRoundBottomCorners");
    }

    const _handleChange = (value: string) => {
        setDropdownIsHidden(value === "");
        handleChange(value);
    }

    const _handleSelect = (value: string) => {
        onLoading();

        const promise = handleSelect(value);
        if (promise !== null) {
            promise!.then(onSelect);
        }
    }

    const handleTextInputFocus = () => {
        setDropdownIsHidden(false);
    }

    const handleTextInputBlur = () => {
        setDropdownIsHidden(true);
    }

    const handleTextInputUp = (e: KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const index = Math.max(selectedIndex - 1, 0);
        input.value = entries[index];

        handleSelectionChange(index);
    }

    const handleTextInputDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const index = Math.min(selectedIndex + 1, entries.length - 1)
        input.value = entries[index];

        handleSelectionChange(index);
    }

    return (
        <div className="DropdownSearch">
            <div className={textInputContainerClasses.join(" ")}>
                <TextInput
                    onChange={_handleChange}
                    onSelect={_handleSelect}
                    onFocus={handleTextInputFocus}
                    onBlur={handleTextInputBlur}
                    onUp={handleTextInputUp}
                    onDown={handleTextInputDown}
                />
            </div>
            {dropdownIsVisible &&
                <Dropdown
                    entries={entries}
                    selected={selectedIndex}
                />
            }
        </div>
    );
}
