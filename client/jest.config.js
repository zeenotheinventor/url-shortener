module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(svg|css)": "<rootDir>/src/__mocks__/fileMock.ts"
    },
    resetMocks: false
}