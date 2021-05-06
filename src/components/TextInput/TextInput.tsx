import React, { useRef, useEffect } from "react";
import "./TextInput.scss";

// @Todo: Export this so TextInputContainer can use it.
type PropsType = {
    onChange:    (value: string) => void;
    onEnter:     (value: string) => void;
    onArrowUp:   () => void;
    onArrowDown: () => void;
    onBlur:      () => void;
    onFocus:     () => void;

    text: string;
}

// @Todo: Add placeholder text.

// @Todo: Refactor this in two components: a more specific
// <TextInput /> component, and a <CustomInput /> component
// that does sanitization.
export default function TextInput(props: PropsType) {
    const { onChange, onEnter, onArrowUp, onArrowDown, onBlur, onFocus, text } = props;

    const textInputRef = useRef<HTMLInputElement>(null!);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        onChange(input.value);
    }

    useEffect(() => {
        textInputRef.current.value = text;
    }, [text]);

    // @Todo: Make sure that this works on mobile too.
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        switch (e.key) {
            case "Enter": {
                e.preventDefault();
                input.blur();
                onEnter(input.value);
            } break;
            case "ArrowUp": {
                e.preventDefault();
                onArrowUp();
            } break;
            case "ArrowDown": {
                e.preventDefault();
                onArrowDown();
            } break;
            case "Escape": {
                input.blur();
            } break;
        }
    }

    return (
        <input
            ref={textInputRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            type="text"
            className="TextInput"
        />
    );
}
