# React Template

## feature

- eslint and prettier for code rules and styling
- storybook for component visualisation, snapshot test and documentation
- vitest for unit test and integration test
- cypress for component test and e2e test
- tailwindcss for style and themes
- enforce convertional commit message

## convertional commit message

https://www.conventionalcommits.org/en/v1.0.0/ <br />
https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional

## src folder structure

The src folder follows the structure of an atomic design. More details could be found in [here](https://medium.com/yemeksepeti-teknoloji/atomic-design-system-in-frontend-bdbb919290b4) and also [here](https://paulonteri.com/thoughts/atomic-design-react).

## eslint and prettier config

[eslint-config](https://www.npmjs.com/package/@joengsh/eslint-config-react?activeTab=readme)
[prettier-config](https://www.npmjs.com/package/@joengsh/prettier-config)

## lint-staged and husky

```bash
yarn add -D husky lint-staged
```

Add lint-staged config

```json
{
  /*...*/
  "scripts": {
    "prepare": "husky install",
    "lint-staged": "lint-staged",
    "format": "prettier --write 'src/**/*.{js,jsx,ts,tsx,css}'",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint-fix": "eslint --fix . --ext .js,.jsx,.ts,.tsx"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,css,json,md,mdx}": ["prettier --write", "git add"],
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "git add"]
  }
  /*...*/
}
```

Add pre-commit hook

```bash
npx husky add .husky/pre-commit "yarn lint-staged"
```

## storybook

```bash
npx sb init
```

Storybook test using [test-runner](https://storybook.js.org/addons/@storybook/test-runner), this repo also include the jest-image-snapshot for visual regression test. add `snapshotTest: disable` parameter to disable the snapshot test for that particular story.

## jest (removed)

[Setup with Vite](https://hung.dev/posts/jest-vite)

## vitest

[setup](https://vitest.dev/guide/)

## tailwindcss

```bash
yarn add -D tailwindcss autoprefixer postcss
npx tailwindcss init
```

## cypress

```bash
yarn add -D cypress
# add cypress open to package.json script, then
yarn cypress:open
# follow the instruction to do the setup
```

## alias

```json
{
  "@/*": ["src/*"],
  "@assets/*": ["src/assets/*"],
  "@components/*": ["src/components/*"],
  "@common/*": ["../fe-design-system-ts/src/*"],
  "@connection/*": ["../fe-connection-ts/src/*"]
}
```

## testing

| script            | when to use                         | description                                              |
| ----------------- | ----------------------------------- | -------------------------------------------------------- |
| vitest:staged     | when commit (husky)                 | run test cases corresponding to the modified src         |
| vitest            | merge to release & uat & production | run all the unit test and integration test               |
| test-storybook:ci | merge to release & uat & production | run all the visual and interaction test based on stories |

TODO:

- add a cypress smoke test suite (cypress:run:smoke) that run before deploying to dev and staging (mainly component test with mocked backend data)
- add a cypress snaity test suite (cypress:run:snaity) that runs before deploying to release, uat & production (mainly component test with mocked backend data and a few e2e test if necessary)
- add a cypress regression test suite (cypress:run:regression) that runs on uat or production env when necessary (mainly e2e test)

## Reference:

- [Reactts-vite-template by Davicho-Dev](https://github.com/Davicho-Dev/ReactTs-Vite-Jest-Testing_Library-TailwindCSS-Cypress-Storybook)
- [tailwindcss dashboard sample](https://tailwindcomponents.com/component/responsive-admin-template)
- [tailwind-element](https://tailwind-elements.com/docs/standard/designblocks/landing-page/)
- [merge coverage report](https://dev.to/penx/combining-storybook-cypress-and-jest-code-coverage-4pa5)
- [storybook testrunner](https://storybook.js.org/addons/@storybook/test-runner)
- [React re-renders guide](https://www.developerway.com/posts/react-re-renders-guide)

## Action List:

- add [cucumber](https://www.npmjs.com/package/cypress-cucumber-preprocessor) support to cypress
