import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import TextInput from "$components/TextInput";
import { AutocompleteData } from "$types/common";
import "./TextInputContainer.scss";

type PropsType = {
    onChange:    (value: string) => void;
    onEnter:     (value: string) => void;
    onArrowUp:   () => void;
    onArrowDown: () => void;
    onClick:     () => void;
    onBlur:      () => void;

    value: string;
    noRoundBottomCorners: boolean;
}

export default function TextInputContainer(props: PropsType) {
    const { noRoundBottomCorners, ...textInputProps } = props;

    const { classes, setClasses } = useClasses("TextInputContainer");

    useEffect(() => {
        setClasses({TextInputContainer__noRoundBottomCorners: noRoundBottomCorners});
    }, [noRoundBottomCorners]);

    return (
        <div className={serializeClasses(classes)}>
            <TextInput {...textInputProps} />
        </div>
    );
}
