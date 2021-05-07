import React, { useContext }  from "react";
import SelectedWeatherInfo from "$components/SelectedWeatherInfo";
import SevenDayForecast from "$components/SevenDayForecast";
import withLoading from "$components/withLoading";
import withContainer from "$components/withContainer";
import { AppDataContext } from "$contexts/AppDataContext";
import normalizeWeatherData from "$utils/normalizeWeatherData";
import "./WeatherInfo.scss";

type PropsType = {
    onSelectWeatherData: (value: number) => void;
    selectedWeatherData: number;
};

function WeatherInfo(props: PropsType) {
    const { onSelectWeatherData, selectedWeatherData } = props;

    // @Todo: Instead of using a context we could just pass
    // the data directly as props.
    const [appData, setAppData] = useContext(AppDataContext);

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
            />
        </div>
    );
}

export default withContainer(withLoading(WeatherInfo), {
    classes: "flex justify-content-center align-items-center"
});
