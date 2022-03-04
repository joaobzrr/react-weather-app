import React, { useMemo } from "react";
import WeatherIcon from "$components/WeatherIcon";
import { Callback, DailyWeatherData } from "$types/common";
import "./DailyForecast.scss";

type PropsType = {
    weatherData: DailyWeatherData[];
}

export default function DailyForecast(props: PropsType) {
    const { weatherData } = props;

    const rows = useMemo(() => {
        const result = [];
        for (const [index, data] of weatherData.entries()) {
            const { weekday, icon, maxTemperature, minTemperature } = data;
            result.push(
                <tr key={index}>
                    <th>{weekday}</th>
                    <td><WeatherIcon iconCode={icon} className="WeatherIcon"/></td>
                    <td>{maxTemperature}&#x00B0;</td>
                    <td>{minTemperature}&#x00B0;</td>
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
