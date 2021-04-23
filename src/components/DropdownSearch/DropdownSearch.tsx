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

    const handleFocus = () => {
        setDropdownIsHidden(false);
    }

    const handleBlur = () => {
        setDropdownIsHidden(true);
    }

    return (
        <div className="DropdownSearch">
            <div className={textInputContainerClasses.join(" ")}>
                <TextInput
                    handleChange={_handleChange}
                    handleSelect={handleSelect}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                />
            </div>
            {dropdownIsVisible && <Dropdown entries={entries}/>}
        </div>
    );
}
