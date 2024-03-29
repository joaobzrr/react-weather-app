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

export function iconCodeToFileName(code: string): string {
    return codeToFileName[code];
}
