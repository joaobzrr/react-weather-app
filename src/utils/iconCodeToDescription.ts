const codeToDescription: {[key: string]: string} = {
    "snow":                "Snow",
    "rain":                "Rain",
    "fog":                 "Fog",
    "wind":                "Wind",
    "cloudy":              "Cloudy",
    "partly-cloudy-day":   "Cloudy",
    "partly-cloudy-night": "Cloudy",
    "clear-day":           "Clear",
    "clear-night":         "Clear"
}

export function iconCodeToDescription(code: string): string {
    return codeToDescription[code];
}
