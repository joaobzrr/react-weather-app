import React from "react";
import TextInput from "$components/TextInput";
import Dropdown from "$components/Dropdown";
import useDropdownSearch from "$hooks/useDropdownSearch";
import { LocationData } from "$src/types";
import "./DropdownSearch.scss";

type PropsType = {
    onStartSelect: () => void;
    onEndSelect:   (locationData: LocationData) => void;
}

export default function DropdownSearch(props: PropsType) {
    const { onStartSelect, onEndSelect } = props;

    const [entries, selectedIndex, dropdownIsVisible, handleFocus, handleBlur, handleChange, handleSelectionChange, handleSelectionPrevious, handleSelectionNext, handleSelect] = useDropdownSearch(onStartSelect, onEndSelect);

    const textInputContainerClasses = ["DropdownSearch_textInputContainer"];
    if (dropdownIsVisible) {
        textInputContainerClasses.push("DropdownSearch_textInputContainer__noRoundBottomCorners");
    }

    return (
        <div className="DropdownSearch">
            <div className={textInputContainerClasses.join(" ")}>
                <TextInput
                    onChange={handleChange}
                    onSelect={handleSelect}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onUp={handleSelectionPrevious}
                    onDown={handleSelectionNext}
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
