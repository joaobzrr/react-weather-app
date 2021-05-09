import React, { useContext }  from "react";
import SelectedWeatherInfo from "$components/SelectedWeatherInfo";
import SevenDayForecast from "$components/SevenDayForecast";
import withLoading from "$components/withLoading";
import withContainer from "$components/withContainer";
import normalizeWeatherData from "$utils/normalizeWeatherData";
import { AppData } from "$types/common";
import "./WeatherInfo.scss";

type PropsType = {
    onSelectWeatherData: (value: number) => void;
    selectedWeatherData: number;
    appData: AppData;
};

function WeatherInfo(props: PropsType) {
    const { onSelectWeatherData, selectedWeatherData, appData } = props;

    const locationData = appData.location;
    const weatherData = normalizeWeatherData(appData.weather, selectedWeatherData);

    return (
        <div className="WeatherInfo">
            <SelectedWeatherInfo
                weatherData={weatherData}
                locationData={locationData}
            />
            <SevenDayForecast
                onSelectWeatherData={onSelectWeatherData}
                appData={appData}
            />
        </div>
    );
}

export default withContainer(withLoading(WeatherInfo), {
    classes: "flex justify-content-center align-items-center"
});
