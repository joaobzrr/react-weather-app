import React, { useContext }  from "react";
import SelectedWeatherInfo from "$components/SelectedWeatherInfo";
import SevenDayForecast from "$components/SevenDayForecast";
import withLoading from "$components/withLoading";
import withContainer from "$components/withContainer";
import {
    AppData,
    CurrentWeatherData,
    ForecastedWeatherData
} from "$types/common";
import "./WeatherInfo.scss";

type PropsType = {
    onSelectWeatherData: (value: number) => void;
    appData: AppData;
    selectedWeekDay: number;
};

function WeatherInfo(props: PropsType) {
    const { onSelectWeatherData, appData, selectedWeekDay } = props;

    const { weatherData, locationData } = appData;

    let selectedWeatherData = {} as CurrentWeatherData;
    if (selectedWeekDay > -1) {
        const { maxTemperature, minTemperature, ...rest } = weatherData.daily[selectedWeekDay];
        selectedWeatherData = Object.assign({}, {temperature: maxTemperature}, rest);
    } else {
        selectedWeatherData = weatherData.current;
    }

    return (
        <div className="WeatherInfo">
            <SelectedWeatherInfo
                weatherData={selectedWeatherData}
                locationData={locationData}
            />
            <SevenDayForecast
                onSelectWeatherData={onSelectWeatherData}
                weatherData={weatherData}
            />
        </div>
    );
}

export default withContainer(withLoading(WeatherInfo), {
    classes: "flex justify-content-center align-items-center"
});
