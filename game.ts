#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";


let currentRoom: string = "Living Room";
let startTime: number = Date.now();
const endTime: number = 60000;


interface Room {
    description: string;
    options: string[];
}

const rooms: {
    [key: string] : Room
} = {
    "Living Room": {
        description: "A dusty living room with damaged furniture. There is a door to the north.",
        options: ["Go North", "Go East", "Look Around"],
    },
    "Kitchen": {
        description: "A dark kitchen with a bad smell. There is a door to the south and a door to the east.",
        options: ["Go South", "Go East", "Open the fridge"],
    },
    "Bedroom": {
        description: "A creepy bedroom with a broken window and spiders. There is a door to the west.",
        options: ["Go West", "Look under the bed"],
    },
};

function startGame(): void{
    inquirer.prompt(
        {
            name: "playerName",
            type: "input",
            message: chalk.white("Enter your name:"),
        }
    )
    .then(
        ({ playerName }) => {
            console.log(chalk.cyan(`Welcome, ${playerName}, to the Rahi Adventure Game!`));
        explore();
        }
    );
};

function explore(): void {
    const room: Room = rooms[currentRoom];
    console.log(chalk.yellow(`You are in the ${currentRoom}`));
    console.log(room.description);

    inquirer.prompt(
        {
            name: "option",
            type: "list",
            message: "What would you like to do?",
            choices: room.options,
        }
    )
    .then(
        ({ option }: { option: string }) => {
            handleOption(option.trim());
        }
    );
};

function handleOption(option: string): void {
    if (currentRoom === "Living Room") {
        if (option === "Go North") currentRoom = "Kitchen";
        else if (option === "Go East") currentRoom = "Bedroom";
        else if (option === "Look Around") {
            console.log(chalk.red("You find an old photo frame."));
        }
    } else if (currentRoom === "Kitchen") {
        if (option === " Go South") currentRoom = "Living Room";
        else if (option === "Go East") currentRoom = "Bedroom";
        else if (option === "Open the fridge") {
            console.log(chalk.red("A ghost jumps out and scares you!"));
        }
    } else if (currentRoom === "Bedroom") {
        if (option === "Go West") currentRoom = "Kitchen";
        else if (option === "Look under the bed") {
            console.log(chalk.red("You find a hidden key."));
        }
    }
    if (Date.now() - startTime > endTime) {
        inquirer.prompt(
            {
            name: "retry",
            type: "list",
            message: chalk.white("Time is up!\n would you like to try again or end the game?"),
            choices: ["Try Again", "Game Over"],
        }
    )
    .then(
        ({ retry }: { retry: String }) => {
            if (retry === " Try Again") {
                currentRoom = "Living Room";
                startTime = Date.now();
                explore();
            } else {
                console.log(chalk.white("Game Over"));
                process.exit();
            }
        }
    );
} else {
    explore();
}
};
startGame();