import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import "./DropdownItem.scss";

type PropsType = {
    onSelect: (selected: number) => void;
    index: number;
    city:     string;
    country:  string;
    selected: boolean;
}

export default function DropdownItem(props: PropsType) {
    const { onSelect, index, city, country, selected } = props;

    const {classes, setClasses} = useClasses("DropdownItem");
    useEffect(() => setClasses({"DropdownItem__selected": selected}), [selected]);

    const onMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
        onSelect(index);
    }

    return (
        <li
            onMouseEnter={onMouseEnter}
            className={serializeClasses(classes)}
        >
            <span className="DropdownItem_city">{city}</span>
            <span className="DropdownItem_country">{country}</span>
        </li>
    );
}
