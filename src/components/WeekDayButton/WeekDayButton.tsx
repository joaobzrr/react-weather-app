import React from "react";
import WeatherIcon from "$components/WeatherIcon";
import { formatTemperature } from "$src/utils";
import "./WeekDayButton.scss";

type PropsType = {
    handlePress:    (value: number) => void;
    minTemperature: number;
    maxTemperature: number;
    iconCode:       string;
    weekDayName:    string;
    weekDayIndex:   number;
};

export default function WeekDayButton(props: PropsType) {
    const { handlePress, weekDayIndex, weekDayName, iconCode, minTemperature, maxTemperature } = props;

    const onClick = () => handlePress(weekDayIndex);

    return (
        <div
            className="WeekDayButton flex flex-column justify-content-center align-items-center"
            onClick={onClick}
        >
            <p className="WeekDayButton_day">{weekDayName}</p>
            <WeatherIcon iconCode={iconCode} />
            <div className="WeekDayButton_temperature">
                <span className="WeekDayButton_max">
                    {formatTemperature(maxTemperature)}
                </span>
                <span className="WeekDayButton_min">
                    {formatTemperature(minTemperature)}
                </span>
            </div>
        </div>
    );
}
