import React, { useState } from "react";
import TextInput from "$components/TextInput";
import Dropdown from "$components/Dropdown";
import { AutocompleteData } from "$src/types";
import "./DropdownSearch.scss";

type PropsType = {
    handleChange: (value: string) => void;
    handleSelect: (value: string) => void;
    entries: string[];
};

export default function DropdownSearch(props: PropsType) {
    const { handleChange, handleSelect, entries } = props;
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
        setDropdownIsHidden(true);
        handleSelect(value);
    }

    const handleFocus = () => {
        setDropdownIsHidden(false);
    }

    return (
        <div className="DropdownSearch">
            <div className={textInputContainerClasses.join(" ")}>
                <TextInput
                    handleChange={_handleChange}
                    handleSelect={_handleSelect}
                    handleFocus={handleFocus}
                />
            </div>
            {dropdownIsVisible && <Dropdown entries={entries}/>}
        </div>
    );
}
