import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import TextInput from "$components/TextInput";
import { Callback, AutocompleteData } from "$types/common";
import "./TextInputContainer.scss";

type PropsType = {
    onChange:    Callback<[string]>;
    onEnter:     Callback<[string]>;
    onArrowUp:   Callback;
    onArrowDown: Callback;
    onClick:     Callback;
    onBlur:      Callback;
    value:       string;

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
