import React, { useRef, useCallback } from "react";
import "./TextInput.scss";

type PropsType = {
    onChange: (value: string) => void;
    onEnter:  (value: string) => void;
}

// @Todo: Add placeholder text.

// @Todo: Refactor this in two components: a more specific
// <TextInput /> component, and a <CustomInput /> component
// that does sanitization.
export default function TextInput(props: PropsType) {
    const { onChange, onEnter } = props;

    const inputRef = useRef<HTMLInputElement>(null!);
    const valueRef = useRef("");

    // @Todo: Make sure that this works on mobile too.
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key !== "Enter") return;

        valueRef.current = inputRef.current.value;
        inputRef.current.blur();
        onEnter(inputRef.current.value);
    }, [inputRef.current, valueRef.current, onEnter]);

    const handleChange = () => {
        onChange(inputRef.current.value);
    }

    return (
        <input
            ref={inputRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type="text"
            className="TextInput"
        />
    );
}
