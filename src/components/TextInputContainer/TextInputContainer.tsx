import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import TextInput from "$components/TextInput";
import "./TextInputContainer.scss";

type PropsType = {
    onInputChange:   (value: string) => void;
    onInputEnter:    (value: string) => void;
    noBottomBorders: boolean;
}

export default function TextInputContainer(props: PropsType) {
    const { onInputChange, onInputEnter, noBottomBorders } = props;

    const { classes, setClasses } = useClasses("TextInputContainer");

    useEffect(() => {
        setClasses({TextInputContainer__hasItems: noBottomBorders});
    }, [noBottomBorders]);

    return (
        <div className={serializeClasses(classes)}>
            <TextInput
                onChange={onInputChange}
                onEnter={onInputEnter}
            />
        </div>
    );
}
