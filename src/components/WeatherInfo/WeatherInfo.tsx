import React, { useMemo } from "react";
import SevenDayForecast from "$components/SevenDayForecast";
import WeatherIcon from "$components/WeatherIcon";
import withLoading from "$components/withLoading";
import withContainer from "$components/withContainer";
import {
    WeatherData,
    CurrentWeatherData,
    ForecastedWeatherData,
    SelectedWeatherData
} from "$services/WeatherData";
import getWeekDayNameFromDate from "$services/getWeekDayNameFromDate";
import "./WeatherInfo.scss";

type PropsType = {
    onPressWeekDayButton: (value: number) => void;
    weatherData: WeatherData;
    selectedWeatherData: SelectedWeatherData;
};

function WeatherInfo(props: PropsType) {
    const { onPressWeekDayButton, weatherData, selectedWeatherData } = props;
    const { city } = weatherData;
    const { description, iconCode, precipitation, humidity, windSpeed } = selectedWeatherData;

    const [temperature, weekDayName] = useMemo(() => {
        let temp;
        if (selectedWeatherData instanceof CurrentWeatherData) {
            temp = (selectedWeatherData as CurrentWeatherData).temperature;
        } else {
            temp = (selectedWeatherData as ForecastedWeatherData).maxTemperature;
        }

        const day = getWeekDayNameFromDate(selectedWeatherData.dt);

        return [temp, day];
    }, [selectedWeatherData]);

    return (
        <div className="WeatherInfo">
            <div className="WeatherInfo_inner1">
                <div className="WeatherInfo_city">{city}</div>
                <div className="WeatherInfo_inner2 flex justify-content-between">
                    <div className="WeatherInfo_inner3">
                        <span className="WeatherInfo_temperature">
                            {temperature}º
                        </span>
                    </div>
                    <div className="WeatherInfo_inner4 flex">
                        <div className="WeatherInfo_inner5 flex flex-column justify-content-center align-items-flex-end">
                            <div className="WeatherInfo_description">{description}</div>
                            <div className="WeatherInfo_details flex flex-column align-items-flex-end">
                                <div>Precipitation: {precipitation}%</div>
                                <div>Humidity: {humidity}%</div>
                                <div>Wind: {windSpeed} km/h</div>
                            </div>
                        </div>
                        <WeatherIcon iconCode={iconCode}/>
                    </div>
                </div>
            </div>
            <SevenDayForecast
                weatherData={weatherData}
                onPressWeekDayButton={onPressWeekDayButton}
            />
        </div>
    );
}

WeatherInfo.displayName = "WeatherInfo";

export default withContainer(withLoading(WeatherInfo), {
    className: "flex justify-content-center align-items-center"
});
