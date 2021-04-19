import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import TextInput from "$components/TextInput";
import "./TextInputContainer.scss";

type PropsType = {
    onInputChange: (value: string) => void;
    onInputEnter:  (value: string) => void;
    isDropdownVisible: boolean;
}

export default function TextInputContainer(props: PropsType) {
    const { onInputChange, onInputEnter, isDropdownVisible } = props;

    const { classes, setClasses } = useClasses("TextInputContainer");

    useEffect(() => {
        setClasses({TextInputContainer__dropdownIsVisible: isDropdownVisible});
    }, [isDropdownVisible]);

    return (
        <div className={serializeClasses(classes)}>
            <TextInput
                onChange={onInputChange}
                onEnter={onInputEnter}
            />
        </div>
    );
}
