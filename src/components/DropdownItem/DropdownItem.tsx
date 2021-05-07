import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import "./DropdownItem.scss";

type PropsType = {
    onMouseClick: (selected: number) => void;
    onMouseEnter: (selected: number) => void;
    index:    number;
    city:     string;
    country:  string;
    selected: boolean;
}

export default function DropdownItem(props: PropsType) {
    const { onMouseClick, onMouseEnter, index, city, country, selected } = props;

    const {classes, setClasses} = useClasses("DropdownItem");
    useEffect(() => setClasses({"DropdownItem__selected": selected}), [selected]);

    const handleMouseClick = (e: React.MouseEvent<HTMLLIElement>) => {
        onMouseClick(index);
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
        onMouseEnter(index);
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
    }

    return (
        <li
            onClick={handleMouseClick}
            onMouseEnter={handleMouseEnter}
            onMouseDown={handleMouseDown}
            className={serializeClasses(classes)}
        >
            <span className="DropdownItem_city">{city}</span>
            <span className="DropdownItem_country">{country}</span>
        </li>
    );
}
