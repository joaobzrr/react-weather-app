import React, { useMemo } from "react";
import DropdownItem from "$components/DropdownItem";
import "./Dropdown.scss";

type PropsType = {
    entries: string[];
    selected: number; // @Rename
}

export default function Dropdown(props: PropsType) {
    const { entries, selected } = props;

    const items = useMemo(() => {
        return entries.map((entry, index) => (
            <DropdownItem
                text={entry} // @Note: Maybe we should use props.children instead?
                selected={(index + 1) === selected}
                key={index}
            />
        ));
    }, [entries, selected]);

    return (
        <ul className="Dropdown">
            {items}
        </ul>
    );
}
