import Robot, { splitCommands, validateInput } from "../src/robot";

const exampleData = [
  {
    input: "W5RW5RW2RW1R",
    expected: {
      x: 4,
      y: 3,
      direction: "North",
    },
  },
  {
    input: "RRW11RLLW19RRW12LW1",
    expected: {
      x: 7,
      y: -12,
      direction: "South",
    },
  },
  {
    input: "LLW100W50RW200W10",
    expected: {
      x: -210,
      y: -150,
      direction: "West",
    },
  },
  {
    input: "LLLLLW99RRRRRW88LLLRL",
    expected: {
      x: -99,
      y: 88,
      direction: "East",
    },
  },
  {
    input: "W55555RW555555W444444W1",
    expected: {
      x: 1000000,
      y: 55555,
      direction: "East",
    },
  },
];

describe("splitCommands", () => {
  it(`should return ["W", 15, "RW", 1]  for input "W15RW1"`, () => {
    expect(splitCommands("W15RW1")).toEqual(["W", 15, "RW", 1]);
  });
});

describe("validateInput", () => {
  let errorMessage: string = "Invalid input";

  it("should return true for valid input", () => {
    expect(validateInput("W15RW1")).toBe(true);
  });

  it(`should throw error for "WWW"`, () => {
    try {
      expect(validateInput("WWW"));
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
    }
  });

  it(`should throw error for "W10R15"`, () => {
    try {
      expect(validateInput("W10R15"));
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
    }
  });
});

describe("Robot tests", () => {
  let robot: Robot;
  let initialPos: Object;

  beforeAll(() => {
    initialPos = {
      x: 0,
      y: 0,
      direction: "North",
    };
  });

  beforeEach(() => {
    robot = new Robot();
  });

  it("Robot constructor", () => {
    expect(robot).toBeDefined();
  });

  it(`should initialize position at x:0, y:0, direction: "NORTH"`, () => {
    expect(robot.getCurrentPosition()).toEqual(initialPos);
  });

  it(`should return initial position if input is empty`, () => {
    expect(robot.run("")).toEqual(initialPos);
  });
});

describe(`Operation tests`, () => {
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot();
  });

  exampleData.forEach((data) =>
    it(`should return x: ${data.expected.x}, y: ${data.expected.y}, direction: ${data.expected.direction} for ${data.input}`, () => {
      expect(robot.run(data.input)).toEqual(data.expected);
    })
  );
});
