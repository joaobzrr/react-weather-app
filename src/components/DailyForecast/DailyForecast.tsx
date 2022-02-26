import React, { useMemo } from "react";
import WeatherIcon from "$components/WeatherIcon";
import getWeekDayNameFromDate from "$services/getWeekDayNameFromDate";
import { Callback, DailyWeatherData } from "$types/common";
import "./DailyForecast.scss";

type PropsType = {
    onSelectWeekDay: Callback<[number]>;
    weatherData:     DailyWeatherData[];
    selectedWeekDay: number;
}

export default function DailyForecast(props: PropsType) {
    const { onSelectWeekDay, weatherData, selectedWeekDay } = props;

    const rows = useMemo(() => {
        const result = [];
        for (const [index, data] of weatherData.entries()) {
            const { weekday, icon, maxTemperature, minTemperature } = data;
            result.push(
                <tr key={index}>
                    <th>{weekday}</th>
                    <td><WeatherIcon iconCode={icon} className="WeatherIcon"/></td>
                    <td>{maxTemperature}º</td>
                    <td>{minTemperature}º</td>
                </tr>
            );
        }
        return result;
    }, [weatherData]);

    return (
        <div className="DailyForecast">
            <table><tbody>{rows}</tbody></table>
        </div>
    );
}
