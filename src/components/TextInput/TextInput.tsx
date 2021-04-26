import React, { useRef, useCallback } from "react";
import "./TextInput.scss";

type PropsType = {
    onChange: (value: string) => void;
    onSelect: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur:   () => void;
    onFocus:  () => void;
    onUp:     (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onDown:   (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

// @Todo: Add placeholder text.

// @Todo: Refactor this in two components: a more specific
// <TextInput /> component, and a <CustomInput /> component
// that does sanitization.
export default function TextInput(props: PropsType) {
    const { onChange, onSelect, onBlur, onFocus, onUp, onDown } = props;

    const inputRef = useRef<HTMLInputElement>(null!);
    const valueRef = useRef("");

    const handleChange = () => {
        onChange(inputRef.current.value);
    }

    // @Todo: Make sure that this works on mobile too.
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "Enter": {
                e.preventDefault();
                valueRef.current = inputRef.current.value;
                inputRef.current.blur();
                onSelect(e);
            } break;
            case "ArrowUp": {
                e.preventDefault();
                onUp(e);
            } break;
            case "ArrowDown": {
                e.preventDefault();
                onDown(e);
            } break;
            case "Escape": {
                inputRef.current.blur();
            } break;
        }
    }, [inputRef.current, valueRef.current, onSelect]);

    return (
        <input
            ref={inputRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            type="text"
            className="TextInput"
        />
    );
}
