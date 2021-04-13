import React, { useRef, useCallback } from "react";
import withContainer from "$components/withContainer";
import "./TextInput.scss";

type PropsType = {
    onInputEnter: (value: string) => void;
}

// @Todo: Add placeholder text.

// @Todo: Refactor this in two components: a more specific
// <TextInput /> component, and a <CustomInput /> component
// that does sanitization.
function TextInput(props: PropsType) {
    const { onInputEnter } = props;

    const inputRef = useRef<HTMLInputElement>(null!);
    const valueRef = useRef("");

    // @Todo: Make sure that this works on mobile too.
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key !== "Enter") return;

        valueRef.current = inputRef.current.value;
        inputRef.current.blur();
        onInputEnter(inputRef.current.value);
    }, [inputRef.current, valueRef.current]);

    return (
        <input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            type="text"
            className="TextInput"
        />
    );
}

export default withContainer(TextInput);
