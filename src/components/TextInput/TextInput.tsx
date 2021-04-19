import React, { useRef, useCallback } from "react";
import "./TextInput.scss";

type PropsType = {
    handleChange: (value: string) => void;
    handleSelect: (value: string) => void;
}

// @Todo: Add placeholder text.

// @Todo: Refactor this in two components: a more specific
// <TextInput /> component, and a <CustomInput /> component
// that does sanitization.
export default function TextInput(props: PropsType) {
    const { handleChange, handleSelect } = props;

    const inputRef = useRef<HTMLInputElement>(null!);
    const valueRef = useRef("");

    const onChange = () => {
        handleChange(inputRef.current.value);
    }

    // @Todo: Make sure that this works on mobile too.
    const onKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key !== "Enter") return;

        valueRef.current = inputRef.current.value;
        inputRef.current.blur();
        handleSelect(inputRef.current.value);
    }, [inputRef.current, valueRef.current, handleSelect]);

    return (
        <input
            ref={inputRef}
            onChange={onChange}
            onKeyDown={onKeyDown}
            type="text"
            className="TextInput"
        />
    );
}
