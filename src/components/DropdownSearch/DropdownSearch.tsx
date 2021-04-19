import React from "react";
import TextInputContainer from "$components/TextInputContainer";
import Dropdown from "$components/Dropdown";
import { AutocompleteData } from "$src/types";
import "./DropdownSearch.scss";

type PropsType = {
    onInputChange: (value: string) => void;
    onInputEnter:  (value: string) => void;
    autocompleteData: AutocompleteData;
};

export default function DropdownSearch(props: PropsType) {
    const { onInputChange, onInputEnter, autocompleteData } = props;

    const isDropdownVisible = autocompleteData.length > 0;

    return (
        <div className="DropdownSearch">
            <TextInputContainer
                onInputChange={onInputChange}
                onInputEnter={onInputEnter}
                isDropdownVisible={isDropdownVisible}
            />
            {isDropdownVisible ? <Dropdown autocompleteData={autocompleteData}/> : null}
        </div>
    );
}
