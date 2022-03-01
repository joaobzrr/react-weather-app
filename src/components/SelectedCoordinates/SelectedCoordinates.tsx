import React from "react";
import ImperialSystemToggle from "$components/ImperialSystemToggle";
import { LocationData, Callback } from "$types/common";
import "./SelectedCoordinates.scss";

type PropsType = {
    locationData:           LocationData;
    usingImperialSystem:    boolean;
    onToggleImperialSystem: Callback<[boolean]>;
}

export default function SelectedCoordinates(props: PropsType) {
    const { locationData, usingImperialSystem, onToggleImperialSystem } = props;

    return (
        <div className="SelectedCoordinates">
            <span className="SelectedCoordinates_city">{locationData.city}</span>
            <ImperialSystemToggle
                usingImperialSystem={usingImperialSystem}
                onToggleImperialSystem={onToggleImperialSystem}
            />
        </div>
    );
}
