export default async function fetchLocationDataFromIP() {
    const key = __IPSTACK_API_KEY__;
    const baseUrl = "http://api.ipstack.com/check";
    const query = `?access_key=${key}`;
    return fetch(baseUrl + query).then(response => response.json()).then(data => {
        return {
            city: data.city,
            lat: data.latitude,
            lon: data.longitude
        };
    });
}
