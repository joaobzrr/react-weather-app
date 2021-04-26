import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import TextInput from "$components/TextInput";
import "./TextInputContainer.scss";

type PropsType = {
    onChange: (value: string) => void;
    onSelect: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur:   () => void;
    onFocus:  () => void;
    onUp:     (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onDown:   (e: React.KeyboardEvent<HTMLInputElement>) => void;

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
