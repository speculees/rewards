# Nx Monorepo – Rewards DS

This repository is an **Nx monorepo** managed with [`pnpm`](https://pnpm.io/), containing:

- **`apps/rewards-ds`** – A demo Angular application.
- **`libs/ui`** – A shared UI component library with Storybook and design tokens.

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (version per `.nvmrc` or `package.json` engines)
- [pnpm](https://pnpm.io/) – Installed globally:

  ```sh
  npm install -g pnpm
  ```

- **VS Code** users: install the [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) extension for an interactive UI to run commands.

---

## 🚀 Getting Started

Install dependencies:

```sh
pnpm install
```

---

## 🏗 Project Structure

```txt
apps/
  rewards-ds/       # Angular demo app
libs/
  ui/               # UI component library (Angular + Storybook)
```

---

## 📜 Useful Nx CLI Commands

You can run any target with:

```sh
pnpm nx <target> <project> [options]
```

### Apps

#### Serve the demo app

```sh
pnpm nx serve rewards-ds
```

Runs the app in development mode on [http://localhost:4200](http://localhost:4200).

#### Build the demo app

```sh
pnpm nx build rewards-ds
```

#### Run tests for the demo app

```sh
pnpm nx test rewards-ds
```

---

### UI Library

#### Build tokens

```sh
pnpm nx build-tokens ui
```

Generates design tokens via [Style Dictionary](https://amzn.github.io/style-dictionary/).

#### Build the library

```sh
pnpm nx build ui
```

#### Run Storybook

```sh
pnpm nx storybook ui
```

Starts Storybook at [http://localhost:4400](http://localhost:4400).

#### Build static Storybook

```sh
pnpm nx build-storybook ui
```

#### Run tests for UI library

```sh
pnpm nx test ui
```

---

## ⚡ Recommended Workflow for running the demo app

1. **Develop components in `libs/ui`** with Rewards DS demo app.

   ```sh
   pnpm nx link-ui rewards-ds
   ```

    The app will use styles and components from the UI library. These components are pre-compiled. The link command will also link the UI library into the demo app dependencies. See root node_modules folder.

2. Serve the app:

   ```sh
   pnpm nx serve rewards-ds
   ```

---

## ⚡ Recommended Workflow for running the storybook UI library

1. **Develop components in `libs/ui`** with Storybook.

   ```sh
   pnpm nx storybook ui 
   ```

  The app will use styles and components from the UI library.
  The components will be compiled with Storybook.

## 🛠 Tips

- Use **Nx Console** in VS Code for a friendly GUI to run tasks without remembering CLI syntax.
- Use `--configuration=production` or `--configuration=development` for explicit build modes.
- You can run multiple targets in parallel:

  ```sh
  pnpm nx run-many --target=build --projects=ui,rewards-ds
  ```

---

## 📚 Nx Documentation

- [Nx.dev – Core Concepts](https://nx.dev/getting-started/intro)
- [Nx Angular Plugin](https://nx.dev/angular)
- [Storybook](https://storybook.js.org/docs/angular/get-started/introduction)
