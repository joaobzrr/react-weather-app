import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import TextInput from "$components/TextInput";
import "./TextInputContainer.scss";

type PropsType = {
    handleChange: (value: string) => void;
    handleSelect: (value: string) => void;
    dropdownIsVisible: boolean;
}

export default function TextInputContainer(props: PropsType) {
    const { handleChange, handleSelect, dropdownIsVisible } = props;

    const { classes, setClasses } = useClasses("TextInputContainer");

    useEffect(() => {
        setClasses({TextInputContainer__dropdownIsVisible: dropdownIsVisible});
    }, [dropdownIsVisible]);

    return (
        <div className={serializeClasses(classes)}>
            <TextInput
                handleChange={handleChange}
                handleSelect={handleSelect}
            />
        </div>
    );
}
