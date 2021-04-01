import React, { useState, useRef, useCallback } from "react";
import { serializeClasses } from "@bzrr/useclasses";
import useClasses from "./useClasses";
import "./TextInput.scss";

type PropsType = {
    onInputEnter: (value: string) => void;
}

// @Todo: Refactor this in two components: a more specific
// <TextInput /> component, and a <CustomInput /> component
// that does sanitization.
export default function TextInput(props: PropsType) {
    const { onInputEnter } = props;

    const {classes, setClasses} = useClasses();
    const inputRef = useRef<HTMLInputElement>(null!);
    const valueRef = useRef("");

    // @Todo: Make sure that this works on mobile too.
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            valueRef.current = inputRef.current.value;
            inputRef.current.blur();

            onInputEnter(inputRef.current.value);
        }
    }, [inputRef.current, valueRef.current]);

    const handleFocus = () => {
        setClasses({TextInput__focused: true});
    }

    const handleBlur = () => {
        setClasses({TextInput__focused: false});
    }

    return (
        <div className={serializeClasses(classes)}>
            <input
                ref={inputRef}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type="text"
                className="TextInput_input"
            />
        </div>
    );
}
