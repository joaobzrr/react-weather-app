import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import "./DropdownItem.scss";

type PropsType = {
    city:     string;
    country:  string;
    selected: boolean;
}

export default function DropdownItem(props: PropsType) {
    const { city, country, selected } = props;

    const {classes, setClasses} = useClasses("DropdownItem");
    useEffect(() => setClasses({"DropdownItem__selected": selected}), [selected]);

    return (
        <li className={serializeClasses(classes)}>
            <span className="DropdownItem_city">{city}</span>
            <span className="DropdownItem_country">{country}</span>
        </li>
    );
}
