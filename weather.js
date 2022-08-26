#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js";
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveCity = async (city) => {
    if (!city.length) {
        printError("City is empty!");
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess("city saved");
    } catch (error) {
        printError(error.message);
    }
};

const saveToken = async (token) => {
    if (!token.length) {
        printError("Token is empty!");
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess("token saved");
    } catch (error) {
        printError(error.message);
    }
};

const getForecast = async () => {
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
    try {
        const weather = await getWeather(city);
        printWeather(weather);
    } catch (e) {
        if (e?.response?.status === 404) {
            printError("City not found");
        } else if (e?.response?.status === 401) {
            printError("Invalid token");
        } else {
            printError(e.message);
        }
    }
};

const initCLI = async () => {
    const args = getArgs(process.argv);

    if (args.h) {
        return printHelp();
    }

    if (args.s) {
        return await saveCity(args.s);
    }

    if (args.t) {
        return await saveToken(args.t);
    }

    getForecast();
};

initCLI();
