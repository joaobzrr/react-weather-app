import React, { useState, useEffect, KeyboardEvent } from "react";
import TextInput from "$components/TextInput";
import Dropdown from "$components/Dropdown";
import { AutocompleteData } from "$src/types";
import "./DropdownSearch.scss";

type PropsType = {
    handleChange:          (value: string) => void;
    handleSelectionChange: (index: number) => void;
    handleSelect:          (value: string) => void;
    entries:               string[];
};

export default function DropdownSearch(props: PropsType) {
    const { handleChange, handleSelectionChange, handleSelect, entries } = props;

    const [dropdownIsHidden, setDropdownIsHidden] = useState(false);
    const dropdownIsVisible = !dropdownIsHidden && entries.length > 0;

    const [selectedEntry, setSelectedEntry] = useState(0);
    useEffect(() => setSelectedEntry(0), [entries]);

    const textInputContainerClasses = ["DropdownSearch_textInputContainer"];
    if (dropdownIsVisible) {
        textInputContainerClasses.push("DropdownSearch_textInputContainer__noRoundBottomCorners");
    }

    const _handleChange = (value: string) => {
        setDropdownIsHidden(value === "");
        handleChange(value);
    }

    const handleFocus = () => {
        setDropdownIsHidden(false);
    }

    const handleBlur = () => {
        setDropdownIsHidden(true);
    }

    const handleTextInputUp = (e: KeyboardEvent<HTMLInputElement>) => {
        setSelectedEntry((value: number) => {
            const index = Math.max(value - 1, 0);
            handleSelectionChange(index);

            const input = e.target as HTMLInputElement;
            input.value = entries[index];

            return index;
        });
    }

    const handleTextInputDown = (e: KeyboardEvent<HTMLInputElement>) => {
        setSelectedEntry((value: number) => {
            const index = Math.min(value + 1, entries.length - 1)
            handleSelectionChange(index);

            const input = e.target as HTMLInputElement;
            input.value = entries[index];

            return index;
        });
    }

    return (
        <div className="DropdownSearch">
            <div className={textInputContainerClasses.join(" ")}>
                <TextInput
                    handleChange={_handleChange}
                    handleSelect={handleSelect}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                    handleUp={handleTextInputUp}
                    handleDown={handleTextInputDown}
                />
            </div>
            {dropdownIsVisible &&
                <Dropdown
                    entries={entries}
                    selected={selectedEntry}
                />
            }
        </div>
    );
}
