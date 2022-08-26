import chalk from "chalk";
import dedent from "dedent-js";
const printError = (error) => {
    console.log(chalk.bgRed(" ERROR ") + " " + error);
};

const printSuccess = (success) => {
    console.log(chalk.bgGreen(" SUCCESS ") + " " + success);
};

const printHelp = () => {
    console.log(
        dedent(
            `
        ${chalk.cyan("HELP")}
        Without parameters – display weather;
        -s [CITY] – set city;
        -h – show help;
        -t [API_KEY] – save token
        `
        )
    );
};

const printWeather = (data) => {
    const city = data.name;
    const weather = data.weather[0].main;
    const description = data.weather[0].description;
    const temp = data.main.temp;
    const feelTemp = data.main.feels_like;
    const visibility = data.visibility;
    console.log(
        dedent(
            `${chalk.blue(city)}
        Weather: ${chalk.cyan(weather)} 
        Temp: ${chalk.bgRed(temp)} Feels like: ${chalk.red(feelTemp)}
        ${chalk.yellow(description)}
        Visibility: ${chalk.bgWhite(visibility / 1000 + " km")}
        `
        )
    );
};

export { printWeather, printError, printSuccess, printHelp };
