import React, { useRef } from "react";
import "./TextInput.scss";

// @Todo: Export this so TextInputContainer can use it.
type PropsType = {
    onChange:    (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect:    (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onArrowUp:   (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onArrowDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur:      () => void;
    onFocus:     () => void;
}

// @Todo: Add placeholder text.

// @Todo: Refactor this in two components: a more specific
// <TextInput /> component, and a <CustomInput /> component
// that does sanitization.
export default function TextInput(props: PropsType) {
    const { onChange, onSelect, onArrowUp, onArrowDown, onBlur, onFocus } = props;

    // @Todo: Make sure that this works on mobile too.
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        switch (e.key) {
            case "Enter": {
                e.preventDefault();
                input.blur();
                onSelect(e);
            } break;
            case "ArrowUp": {
                e.preventDefault();
                onArrowUp(e);
            } break;
            case "ArrowDown": {
                e.preventDefault();
                onArrowDown(e);
            } break;
            case "Escape": {
                input.blur();
            } break;
        }
    }

    return (
        <input
            onChange={onChange}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            type="text"
            className="TextInput"
        />
    );
}
