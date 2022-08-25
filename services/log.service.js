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

export { printError, printSuccess, printHelp };
