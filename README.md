# React Template

## feature

- eslint and prettier for code rules and styling
- storybook for component visualisation and documentation
- jest for unit test
- cypress + cucumber for component test and e2e test
- tailwindcss for style and themes

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

## jest

[Setup with Vite](https://hung.dev/posts/jest-vite)

## tailwindcss

```bash
yarn add -D tailwindcss autoprefixer postcss
npx tailwindcss init
```
