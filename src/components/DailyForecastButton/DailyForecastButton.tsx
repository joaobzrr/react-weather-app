import React, { useEffect } from "react";
import { useClasses, serializeClasses } from "@bzrr/useclasses";
import Button from "$components/Button";
import WeatherIcon from "$components/WeatherIcon";
import { ButtonPropsType } from "$types/common";

import "./DailyForecastButton.scss";

type PropsType = ButtonPropsType & {
    selected:       boolean;
    maxTemperature: number;
    iconCode:       string;
    time:           string;
};

export default function DailyForecastButton(props: PropsType) {
    const { selected, maxTemperature, iconCode, time, ...buttonProps } = props;

    const { classes, setClasses } = useClasses("DailyForecastButton");

    useEffect(() => setClasses({DailyForecastButton__selected: selected}), [selected]);

    return (
        <Button className={serializeClasses(classes)} {...buttonProps}>
            <p className="DailyForecastButton_day">{time + ""}</p>
            <WeatherIcon
                iconCode={iconCode}
                className="DailyForecastButton_icon"
            />
            <div className="DailyForecastButton_temperature">
                {maxTemperature}&#x00B0;
            </div>
        </Button>
    );
}
