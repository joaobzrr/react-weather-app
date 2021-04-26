import React from "react";
import TextInputContainer from "$components/TextInputContainer";
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

    return (
        <div className="DropdownSearch">
            <TextInputContainer
                onChange={handleChange}
                onSelect={handleSelect}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onUp={handleSelectionPrevious}
                onDown={handleSelectionNext}
                noRoundBottomCorners={dropdownIsVisible}
            />
            {dropdownIsVisible &&
                <Dropdown
                    entries={entries}
                    selected={selectedIndex}
                />
            }
        </div>
    );
}
