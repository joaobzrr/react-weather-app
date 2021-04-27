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

    const [autocompleteData, selectedIndex, dropdownIsVisible, handleFocus, handleBlur, handleChange, handleSelectionPrevious, handleSelectionNext, handleSelect] = useDropdownSearch(onStartSelect, onEndSelect);

    return (
        <div className="DropdownSearch">
            <TextInputContainer
                onChange={handleChange}
                onSelect={handleSelect}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onArrowUp={handleSelectionPrevious}
                onArrowDown={handleSelectionNext}
                noRoundBottomCorners={dropdownIsVisible}
            />
            {dropdownIsVisible &&
                <Dropdown
                    autocompleteData={autocompleteData}
                    selectedIndex={selectedIndex}
                />
            }
        </div>
    );
}
