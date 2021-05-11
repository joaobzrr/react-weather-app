import { cloneWeatherData, celsiusToFahrenheit } from "$utils/common";
import { WeatherData, MeasurementSystem } from "$types/common";

export default function convertWeatherData(weatherData: WeatherData, units: MeasurementSystem) {
    const result = cloneWeatherData(weatherData);
    if (units === "metric") {
        return result;
    }

    const oldTemperature = result.current.temperature;
    const newTemperature = Math.round(celsiusToFahrenheit(oldTemperature));
    result.current.temperature = newTemperature;

    for (const forecasted of result.daily) {
        const oldMaxTemperature = forecasted.maxTemperature;
        const newMaxTemperature = Math.round(celsiusToFahrenheit(oldMaxTemperature));
        forecasted.maxTemperature = newMaxTemperature;

        const oldMinTemperature = forecasted.minTemperature;
        const newMinTemperature = Math.round(celsiusToFahrenheit(oldMinTemperature));
        forecasted.minTemperature = newMinTemperature;
    }

    return result;
}
