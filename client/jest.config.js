module.exports = {
  testURL: "http://localhost/",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "json", "vue"],
  watchman: false,
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
    "^~~/(.*)$": "<rootDir>/$1",
    "^@/(.*)$": "<rootDir>/$1"
  },
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  },
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/components/**/*.vue",
    "<rootDir>/pages/*.vue"
  ],
  snapshotSerializers: ["jest-serializer-vue"],
  globals: {
    "vue-jest": {
      pug: { doctype: 'html' },
      babelConfig: {
        presets: [
          "@babel/env", 
          "@vue/cli-plugin-babel/preset"
        ]
      }
    }
  }
}