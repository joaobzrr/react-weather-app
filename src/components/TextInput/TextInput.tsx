import React, { useRef, useEffect } from "react";
import { TextInputPropsType } from "$types/common";
import "./TextInput.scss";

// @Todo: Refactor this in two components: a more specific
// <TextInput /> component, and a <CustomInput /> component
// that does sanitization.
export default function TextInput(props: TextInputPropsType) {
    const { onChange, onEnter, onArrowUp, onArrowDown, onClick, onBlur, value } = props;

    const textInputRef = useRef<HTMLInputElement>(null!);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        onChange(input.value);
    }

    useEffect(() => { textInputRef.current.value = value; }, [value]);

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
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onClick={onClick}
            onBlur={onBlur}
            type="text"
            className="TextInput"
            placeholder={"Enter city name"}
            ref={textInputRef}
        />
    );
}
