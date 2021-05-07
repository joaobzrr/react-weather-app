import React, { useMemo } from "react";
import DropdownItem from "$components/DropdownItem";
import { AutocompleteData } from "$types/common";
import "./Dropdown.scss";

type PropsType = {
    onDropdownItemMouseClick: (selected: number) => void;
    onDropdownItemMouseEnter: (selected: number) => void;
    autocompleteData: AutocompleteData;
    selectedIndex: number;
}

export default function Dropdown(props: PropsType) {
    const {
        onDropdownItemMouseClick,
        onDropdownItemMouseEnter,
        autocompleteData,
        selectedIndex
    } = props;

    const items = useMemo(() => {
        return autocompleteData.map((data, index) => {
            const { city, country } = data;
            const selected = index === selectedIndex;

            return (
                <DropdownItem
                    onMouseClick={onDropdownItemMouseClick}
                    onMouseEnter={onDropdownItemMouseEnter}
                    index={index}
                    city={city}
                    country={country}
                    selected={selected}
                    key={index}
                />
            );
        });
    }, [autocompleteData, selectedIndex]);

    return (
        <ul className="Dropdown">
            {items}
        </ul>
    );
}
