module.exports = {
    rootDir: './',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/test/',
    ],
    moduleFileExtensions: [
        'js',
        'ts',
    ],
    testEnvironment: 'node',
    testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
