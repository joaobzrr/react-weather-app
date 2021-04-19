import React, { useState } from "react";
import TextInputContainer from "$components/TextInputContainer";
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

    const _handleChange = (value: string) => {
        setDropdownIsHidden(value === "");
        handleChange(value);
    }

    const _handleSelect = (value: string) => {
        setDropdownIsHidden(true);
        handleSelect(value);
    }

    return (
        <div className="DropdownSearch">
            <TextInputContainer
                handleChange={_handleChange}
                handleSelect={_handleSelect}
                dropdownIsVisible={dropdownIsVisible}
            />
            {dropdownIsVisible && <Dropdown entries={entries}/>}
        </div>
    );
}
