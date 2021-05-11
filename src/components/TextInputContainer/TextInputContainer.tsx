import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import TextInput from "$components/TextInput";
import {
    Callback,
    TextInputPropsType,
    AutocompleteData
} from "$types/common";
import "./TextInputContainer.scss";

type PropsType = TextInputPropsType & {
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
