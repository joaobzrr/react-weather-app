import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useClasses";
import "./DropdownEntry.scss";

type PropsType = {
    text: string;
    selected: boolean;
}

export default function DropdownEntry(props: PropsType) {
    const { text, selected } = props;

    const {classes, setClasses} = useClasses("DropdownEntry");
    useEffect(() => setClasses({"DropdownEntry__selected": selected}), [selected]);

    return (
        <li className={serializeClasses(classes)}>
            {text}
        </li>
    );
}
