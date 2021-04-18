import React, { useMemo } from "react";
import { AutocompleteData, ArrayElementType } from "$src/types";
import "./Dropdown.scss";

type PropsType = {
    autocompleteData: AutocompleteData;
}

export default function DropdownSearch(props: PropsType) {
    const { autocompleteData } = props;

    const items = useMemo(() => {
        return autocompleteData.map((item, index) => (
            <li className="Dropdown_entry" key={index}>
                {item.city}
            </li>
        ));
    }, [autocompleteData]);

    return (
        <ul className="Dropdown">
            {items}
        </ul>
    );
}
