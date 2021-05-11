import React from "react";
import Button from "$components/Button";
import WeatherIcon from "$components/WeatherIcon";
import { ButtonPropsType } from "$types/common";
import "./WeekDayButton.scss";

type PropsType = ButtonPropsType & {
    minTemperature: number;
    maxTemperature: number;
    iconCode:       string;
    weekDayName:    string;
};

export default function WeekDayButton(props: PropsType) {
    const { weekDayName, iconCode, minTemperature, maxTemperature, ...buttonProps } = props;

    return (
        <Button className="WeekDayButton" {...buttonProps}>
            <p className="WeekDayButton_day">{weekDayName}</p>
            <WeatherIcon iconCode={iconCode} />
            <div className="WeekDayButton_temperature">
                <span className="WeekDayButton_max">
                    {maxTemperature}º
                </span>
                <span className="WeekDayButton_min">
                    {minTemperature}º
                </span>
            </div>
        </Button>
    );
}
