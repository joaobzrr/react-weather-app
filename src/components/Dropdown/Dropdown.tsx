import React, { useMemo } from "react";
import DropdownEntry from "$components/DropdownEntry";
import { AutocompleteData, ArrayElementType } from "$src/types";
import "./Dropdown.scss";

type PropsType = {
    entries: string[];
}

export default function Dropdown(props: PropsType) {
    const { entries } = props;

    const selected = 0; // @Temporary

    const items = useMemo(() => {
        return entries.map((entry, index) => {
            return (
                <DropdownEntry
                    text={entry} // @Note: Maybe we should use props.children instead?
                    selected={index === selected}
                    key={index}
                />
            );
        });
    }, [entries]);

    return (
        <ul className="Dropdown">
            {items}
        </ul>
    );
}
