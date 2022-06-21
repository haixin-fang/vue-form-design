module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    describe: true,
    it: true,
    expect: true,
    beforeEach: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/typescript/recommended", "@vue/prettier/@typescript-eslint"],
  parser: "vue-eslint-parser",
  parserOptions: {
    // Use babel-eslint for JavaScript
    parser: "babel-eslint",
    ecmaVersion: 2017,
    // With import/export syntax
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint", "simple-import-sort"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-mutating-props": 0,
    "endOfLine": 0,
    "@typescript-eslint/no-this-alias": ["off"],
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
