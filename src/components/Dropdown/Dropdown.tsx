import React, { useMemo } from "react";
import DropdownItem from "$components/DropdownItem";
import { AutocompleteData, ArrayElementType } from "$src/types";
import "./Dropdown.scss";

type PropsType = {
    entries: string[];
    selected: number; // @Rename
}

export default function Dropdown(props: PropsType) {
    const { entries, selected } = props;

    const items = useMemo(() => {
        return entries.map((entry, index) => {
            return (
                <DropdownItem
                    text={entry} // @Note: Maybe we should use props.children instead?
                    selected={index === selected}
                    key={index}
                />
            );
        });
    }, [entries, selected]);

    return (
        <ul className="Dropdown">
            {items}
        </ul>
    );
}
