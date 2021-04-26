import React, { useContext }  from "react";
import SelectedWeatherInfo from "$components/SelectedWeatherInfo";
import SevenDayForecast from "$components/SevenDayForecast";
import withLoading from "$components/withLoading";
import withContainer from "$components/withContainer";
import { AppDataContext } from "$contexts/AppDataContext";
import { SelectedWeatherData } from "$src/types";
import "./WeatherInfo.scss";

type PropsType = {
    handleSelectWeekDay: (value: number) => void;
    selectedWeatherData: SelectedWeatherData;
};

function WeatherInfo(props: PropsType) {
    const { handleSelectWeekDay, selectedWeatherData } = props;

    const [appData, setAppData] = useContext(AppDataContext);

    const locationData = appData.location;
    const weatherData = (selectedWeatherData === "current") ?
        appData.weather.current :
        appData.weather.daily[selectedWeatherData];

    return (
        <div className="WeatherInfo">
            <SelectedWeatherInfo
                weatherData={weatherData}
                locationData={locationData}
            />
            <SevenDayForecast
                handleSelectWeekDay={handleSelectWeekDay}
            />
        </div>
    );
}

export default withContainer(withLoading(WeatherInfo), {
    classes: "flex justify-content-center align-items-center"
});
