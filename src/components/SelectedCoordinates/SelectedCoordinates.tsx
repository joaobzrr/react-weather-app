import React from "react";
import { LocationData } from "$types/common";
import "./SelectedCoordinates.scss";

type PropsType = {
    locationData: LocationData;
}

export default function SelectedCoordinates(props: PropsType) {
    const { locationData } = props;

    return (
        <div className="SelectedCoordinates">
            <span className="SelectedWeatherInfo_city">{locationData.city}</span>
        </div>
    );
}
