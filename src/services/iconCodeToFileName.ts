const codeToFileName: {[key: string]: string} = {
    "snow":                "snow",
    "rain":                "rain",
    "fog":                 "fog",
    "wind":                "wind",
    "cloudy":              "cloudy",
    "partly-cloudy-day":   "cloudy",
    "partly-cloudy-night": "cloudy",
    "clear-day":           "clearSkyDay",
    "clear-night":         "clearSkyNight"
}

export default function iconCodeToFileName(code: string) {
    debugger;
    return codeToFileName[code];
}
