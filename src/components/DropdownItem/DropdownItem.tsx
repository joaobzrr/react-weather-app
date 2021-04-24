import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useClasses";
import "./DropdownItem.scss";

type PropsType = {
    text: string;
    selected: boolean;
}

export default function DropdownItem(props: PropsType) {
    const { text, selected } = props;

    const {classes, setClasses} = useClasses("DropdownItem");
    useEffect(() => setClasses({"DropdownItem__selected": selected}), [selected]);

    return (
        <li className={serializeClasses(classes)}>
            {text}
        </li>
    );
}
