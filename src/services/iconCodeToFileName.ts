const codeToFileName: {[key: string]: string} = {
    "01d": "clearSkyDay",
    "01n": "clearSkyNight",
    "02d": "fewCloudsDay",
    "02n": "fewCloudsNight",
    "03d": "scatteredClouds",
    "03n": "scatteredClouds",
    "04d": "brokenClouds",
    "04n": "brokenClouds",
    "09d": "showerRainDay",
    "09n": "showerRainNight",
    "10d": "rainDay",
    "10n": "rainNight",
    "11d": "thunderstormDay",
    "11n": "thunderstormNight",
    "13d": "snowDay",
    "13n": "snowNight",
    "50d": "mistDay",
    "50n": "mistNight"
}

export default function iconCodeToFileName(code: string) {
    return codeToFileName[code];
}
