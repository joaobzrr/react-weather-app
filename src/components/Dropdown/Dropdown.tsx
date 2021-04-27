import React, { useMemo } from "react";
import DropdownItem from "$components/DropdownItem";
import { AutocompleteData } from "$src/types";
import "./Dropdown.scss";

type PropsType = {
    autocompleteData: AutocompleteData;
    selectedIndex:    number;
}

export default function Dropdown(props: PropsType) {
    const { autocompleteData, selectedIndex } = props;

    const items = useMemo(() => {
        return autocompleteData.map((data, index) => {
            const { city, country } = data;
            const selected = (index + 1) === selectedIndex;

            return (
                <DropdownItem
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
