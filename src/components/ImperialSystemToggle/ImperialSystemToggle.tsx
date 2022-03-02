import React from "react";
import { Callback } from "$types/common";
import "./ImperialSystemToggle.scss";

type PropsType = {
    onToggleImperialSystem: Callback<[boolean]>;
    usingImperialSystem:    boolean;
}

export default function ImperialSystemToggle(props: PropsType) {
    const { onToggleImperialSystem, usingImperialSystem } = props;

    return (
        <div className="ImperialSystemToggle_container">
            <span className="ImperialSystemToggle_text">&#x00B0;F</span>
            <div className="ImperialSystemToggle">
                <input
                    type="checkbox"
                    className="ImperialSystemToggle_checkbox"
                    checked={usingImperialSystem}
                    onChange={() => {}}
                />
                <span
                    className="ImperialSystemToggle_slider"
                    onClick={() => onToggleImperialSystem(usingImperialSystem)}
                >
                </span>
            </div>
        </div>
    );
}
