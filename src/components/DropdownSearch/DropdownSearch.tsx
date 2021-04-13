import React from "react";
import TextInput from "$components/TextInput";
import "./DropdownSearch.scss";

type PropsType = {
    onInputEnter: (value: string) => void;
};

export default function DropdownSearch(props: PropsType) {
    const { onInputEnter } = props;

    return (
        <div className="DropdownSearch">
            <TextInput onInputEnter={onInputEnter} />
        </div>
    );
}
