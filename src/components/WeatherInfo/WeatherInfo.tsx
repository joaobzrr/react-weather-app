import React, { useState, useContext }  from "react";
import SelectedWeatherInfo from "$components/SelectedWeatherInfo";
import SevenDayForecast from "$components/SevenDayForecast";
import withLoading from "$components/withLoading";
import withContainer from "$components/withContainer";
import convertWeatherData from "$utils/convertWeatherData";
import { AppData, CurrentWeatherData, MeasurementSystem } from "$types/common";
import "./WeatherInfo.scss";

type PropsType = {
    onSelectWeekDay: (value: number) => void;
    appData: AppData;
    selectedWeekDay: number;
};

function WeatherInfo(props: PropsType) {
    const { onSelectWeekDay, appData, selectedWeekDay } = props;
    const { weatherData, locationData } = appData;

    const [measurementSystem, setMeasurementSystem] = useState<MeasurementSystem>("imperial");

    let _weatherData = convertWeatherData(weatherData, measurementSystem);

    let selectedWeatherData = {} as CurrentWeatherData;
    if (selectedWeekDay > -1) {
        const { maxTemperature, minTemperature, ...rest } = _weatherData.daily[selectedWeekDay];
        selectedWeatherData = Object.assign({}, {temperature: maxTemperature}, rest);
    } else {
        selectedWeatherData = _weatherData.current;
    }

    return (
        <div className="WeatherInfo">
            <SelectedWeatherInfo
                weatherData={selectedWeatherData}
                locationData={locationData}
            />
            <SevenDayForecast
                onSelectWeekDay={onSelectWeekDay}
                weatherData={_weatherData}
            />
        </div>
    );
}

export default withContainer(withLoading(WeatherInfo), {
    classes: "flex justify-content-center align-items-center"
});
