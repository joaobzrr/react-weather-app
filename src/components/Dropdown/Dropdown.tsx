import React, { useMemo } from "react";
import { AutocompleteData, ArrayElementType } from "$src/types";
import "./Dropdown.scss";

type PropsType = {
    entries: string[];
}

export default function Dropdown(props: PropsType) {
    const { entries } = props;

    const items = useMemo(() => {
        return entries.map((entry, index) => (
            <li className="Dropdown_entry" key={index}>
                {entry}
            </li>
        ));
    }, [entries]);

    return (
        <ul className="Dropdown">
            {items}
        </ul>
    );
}
