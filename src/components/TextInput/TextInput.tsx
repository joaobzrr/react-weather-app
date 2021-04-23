import React, { useRef, useCallback, KeyboardEvent } from "react";
import "./TextInput.scss";

type PropsType = {
    handleChange: (value: string) => void;
    handleSelect: (value: string) => void;
    handleBlur:   () => void;
    handleFocus:  () => void;
    handleUp:     (e: KeyboardEvent<HTMLInputElement>) => void;
    handleDown:   (e: KeyboardEvent<HTMLInputElement>) => void;
}

// @Todo: Add placeholder text.

// @Todo: Refactor this in two components: a more specific
// <TextInput /> component, and a <CustomInput /> component
// that does sanitization.
export default function TextInput(props: PropsType) {
    const { handleChange, handleSelect, handleBlur, handleFocus, handleUp, handleDown } = props;

    const inputRef = useRef<HTMLInputElement>(null!);
    const valueRef = useRef("");

    const onChange = () => {
        handleChange(inputRef.current.value);
    }

    // @Todo: Make sure that this works on mobile too.
    const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "Enter": {
                e.preventDefault();
                valueRef.current = inputRef.current.value;
                inputRef.current.blur();
                handleSelect(inputRef.current.value);
            } break;
            case "ArrowUp": {
                e.preventDefault();
                handleUp(e);
            } break;
            case "ArrowDown": {
                e.preventDefault();
                handleDown(e);
            } break;
            case "Escape": {
                inputRef.current.blur();
            } break;
        }
    }, [inputRef.current, valueRef.current, handleSelect]);

    return (
        <input
            ref={inputRef}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            className="TextInput"
        />
    );
}
