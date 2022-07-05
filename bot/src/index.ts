// tslint:disable: no-console
import Robot from "./robot.js";
import inquirer from "inquirer";

const robot = new Robot();
// TODO: Use interface

function runAgain(): void {
  inquirer
    .prompt<{ runAgain: boolean }>([
      {
        type: "confirm",
        name: "runAgain",
        message: "Run again?",
      },
    ])
    .then((answers: { runAgain: boolean }) => {
      if (answers.runAgain) {
        return main();
      }
      console.log(`Thank you for using this bot!`);
    })
    .catch((error: { message: string }) => {
      console.error(error.message);
      process.exit(0);
    });
}

function main(): void {
  inquirer
    .prompt<{ input: string }>([
      {
        type: "input",
        name: "input",
        message: "Input command:",
      },
    ])
    .then((answers: { input: string }) => {
      robot.initialBot();
      console.log(robot.run(answers.input));
      runAgain();
    })
    .catch((error: { message: string }) => {
      console.error(error.message);
      process.exit(0);
    });
}

main();
