import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

const getWeather = async (city) => {
    const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));
    if (!token) {
        throw new Error("API key not set, set it with -t [API_KEY]");
    }
    const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
            q: city,
            appid: token,
            units: "metric",
        },
    });
    return data;
};

export { getWeather };
