import React from "react";
import "./WeatherIcon.scss";

type PropsType = {
    src: string;
}

export default function WeatherIcon(props: PropsType) {
    return (
        <img
            className="WeatherIcon"
            src={props.src}
        />
    );
}
