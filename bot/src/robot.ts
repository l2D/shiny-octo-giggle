interface POSITIONS {
  x: number;
  y: number;
  direction: string;
}
let currPos: POSITIONS;
let moveForwardToggle = false;

const VALID_CHARS_REGEX = /[^wrl\d]/g;

const DIRECTIONS: string[] = ["North", "East", "South", "West"];

/**
 * @param  {string} input that received from user
 * @description Validate input string
 * - Check valid characters, Valid characters are W, R, L, and digits
 * - Check "W" character, e.g. "W" -> valid, "WW" -> invalid
 * @returns {boolean | Error} boolean (true) when input is valid, Error when input is invalid
 */
export function validateInput(input: string): boolean | Error {
  input = input.toLowerCase();

  if (VALID_CHARS_REGEX.test(input)) {
    throw new Error("Invalid input");
  }

  if (input.match(/w{2,}/g)) {
    throw new Error("Invalid input");
  }

  // If after R or L is digits, it is invalid
  if (input.match(/[rl]\d/g)) {
    throw new Error("Invalid input");
  }

  return true;
}

/**
 * @param  {string} input
 * @description Find match pattern and grouping input,
 * - Group 1: Any characters except digits
 * - Group 2: Digits
 * - Group 3: Everything left from group 1 and 2
 * @returns {(string | number)[]} array of matched pattern
 */
function naturalMatch(input: string): (string | number)[] {
  const arr = [];
  const extrRegEx = /^(\D+)?(\d+)?(.*)$/;
  let s = input;
  while (s) {
    const match = s.match(extrRegEx);
    if (!match) {
      break;
    }
    if (match[1]) {
      arr.push(match[1]);
    }
    if (match[2]) {
      arr.push(parseInt(match[2], 10));
    }
    s = match[3];
  }

  return arr;
}

/**
 * @param  {string} input
 * @description Split input string into array of commands
 * @returns {string[]} array of commands
 */
export function splitCommands(input: string): (string | number)[] {
  const commands: (string | number)[] = naturalMatch(input);

  return commands;
}

/**
 * @param  {number} steps
 * @description Move forward with n steps on current direction.
 * - Store result in `currPos.x` or `currPos.y` depending on direction
 */
function moveForward(steps: number): void {
  if (!steps) throw new Error("No steps");
  if (steps < 0) throw new Error("Steps must be positive");

  switch (currPos.direction) {
    case "North":
      currPos.y += steps;
      break;
    case "East":
      currPos.x += steps;
      break;
    case "South":
      currPos.y -= steps;
      break;
    case "West":
      currPos.x -= steps;
      break;
    default:
      throw new Error("Invalid direction");
  }
}

/**
 * @description Turn right from current direction
 * - Store result in `currPos.direction` after turning
 * - {number} index of current direction in DIRECTIONS array (0-3) + 1 and modulo 4 to get next direction
 * @fomula `current_index + 1 % 4`
 * @example
 * 0 + 1 % 4 = 1
 * 1 + 1 % 4 = 2
 * 2 + 1 % 4 = 3
 * 3 + 1 % 4 = 0
 */
function turnRight() {
  currPos.direction =
    DIRECTIONS[(DIRECTIONS.indexOf(currPos.direction) + 1) % 4];
}

/**
 * @description Turn left from current direction
 * - Store result in `currPos.direction` after turning
 * - {number} index of current direction in DIRECTIONS array (0-3) + 3 and modulo 4 to get previous direction
 * @fomula `current_index + 3 % 4`
 * @example
 * 0 + 3 % 4 = 3
 * 1 + 3 % 4 = 0
 * 2 + 3 % 4 = 1
 * 3 + 3 % 4 = 2
 */
function turnLeft() {
  currPos.direction =
    DIRECTIONS[(DIRECTIONS.indexOf(currPos.direction) + 3) % 4];
}

/**
 * @param  {string|number} command
 * @description Operate commands,
 * - "W" -> move forward
 * - "R" -> turn right
 * - "L" -> turn left
 * - digits -> steps to move forward
 */
export function operate(command: string | number): void {
  if (typeof command === "string") {
    command = command.toLowerCase();
    for (const element of command) {
      switch (element) {
        case "w":
          moveForwardToggle = true;
          break;
        case "r":
          turnRight();
          break;
        case "l":
          turnLeft();
          break;
        default:
          throw new Error("Invalid command");
      }
    }
  } else {
    if (moveForwardToggle) {
      moveForward(command);
      moveForwardToggle = false;
    }
  }
}

export default class Robot {
  constructor() {
    this.initialBot();
  }

  initialBot(): void {
    currPos = { x: 0, y: 0, direction: "North" };
  }

  getCurrentPosition(): POSITIONS {
    return currPos;
  }

  run(input: string): POSITIONS {
    validateInput(input);
    const commands: (string | number)[] = splitCommands(input);

    commands.forEach((command) => operate(command));
    return currPos;
  }
}
