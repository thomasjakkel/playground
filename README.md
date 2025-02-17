# playground

A basic app with:

- React typescript frontend
- Node.js & Express typescript backend
- yarn package manager

## Backend Setup Typescript with Node.js and Typescript

1. Initialize new node.js project

   ```sh
   mkdir backend
   cd backend
   yarn init -y
   ```

2. Install express, typescript and related dependencies

   ```sh
   yarn add express
   yarn add -D @types/express typescript ts-node
   ```

   - `typescript`: The TypeScript compiler<br>
   - `ts-node`: Enables running TypeScript files directly with Node.js
   - `@types/express`: Provides TypeScript definitions for Express

3. Create `tsconfig.json` file in project root

   ```json
   {
     "compilerOptions": {
       "target": "es2020",
       "module": "commonjs",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true,
       "outDir": "./dist"
     },
     "include": ["src/**/*.ts"],
     "exclude": ["node_modules"]
   }
   ```

4. Create `src` folder with a basic Express setup

   ```javascript
   import express from 'express'

   const app = express()
   const port = 3000

   app.get('/', (req, res) => {
     res.send('Hello, TypeScript with Express!')
   })

   app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`)
   })
   ```

5. Update the `package.json` file

   ```json
       "scripts": {
           "start": "ts-node src/index.ts"
       },
   ```

6. Add nodemon

   ```sh
       yarn add -D nodemon
   ```

   Update scripts in `package.json` file

   ```json
   "scripts": {
       "start-watch": "nodemon --watch \"*.ts\" --exec \"ts-node\" ./src/index.ts",
   },
   ```

## Frontend Setup

1. Create react app with vite

   ```sh
       yarn create vite
   ```

   Use React Typescript + SWC

2. Setup prettier

   ```sh
       yarn add --dev --exact prettier
   ```

   Create a `.prettierrc` file at root:

   ```json
   {
     "semi": false,
     "tabWidth": 2,
     "printWidth": 80,
     "singleQuote": true,
     "trailingComma": "all",
     "jsxSingleQuote": true,
     "bracketSpacing": true,
     "endOfLine": "lf"
   }
   ```

   Create a `.prettierignore` file at root:

   ```
       **/node_modules
       **/build
       **/dist
       **/coverage
       **/package.json
       **/yarn.lock
       **/package-lock.json
       **/.eslintrc.cjs
       **/README.md
   ```

   If you use ESLint, install eslint-config-prettier to make ESLint and Prettier play nice with each other. It turns off all ESLint rules that are unnecessary or might conflict with Prettier.

   ```sh
       yarn add -D eslint-config-prettier
   ```

   Add the following scripts to the `package.json`:

   ```json
   "format": "prettier --write '**/src/**/*.(ts|tsx|css|md|json)' --config .prettierrc",
   "format:check": "prettier --check '**/src/**/*.(ts|tsx|css|md|json)' --config .prettierrc"
   ```

3. Define working directory in vscode

   Create a `.vscode/settings.json` file with:

   ```json
   {
     // Prettier
     "prettier.configPath": "./frontend-vite-react/.prettierrc",
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.formatOnPaste": true, // required
     "editor.formatOnType": false, // required
     "editor.formatOnSave": true, // optional
     "editor.formatOnSaveMode": "file", // required to format on save
     "files.autoSave": "onFocusChange", // optional but recommended
     // Eslint
     "eslint.workingDirectories": ["./frontend-vite-react"],
     "eslint.validate": [
       "javascript",
       "javascriptreact",
       "typescript",
       "typescriptreact"
     ],
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": "explicit"
     },
     //
     "files.eol": "\n" // LF (Unix) instead of CRLF (Windows)
   }
   ```

4. Setup Vitest

   ```sh
    yarn add -D vitest
    yarn add -D @testing-library/react @testing-library/dom @testing-library/jest-dom @types/react @types/react-dom jsdom
   ```

   - `@testing-library/react` is for component testing
   - `@testing-library/jest-dom` is for DOM assertions
   - `jsdom` is for simulating a browser environment in Node for testing purposes

   Update `vite.config.ts` to include testing configurations

   ```typescript
   /// <reference types="vitest" />
   /// <reference types="vite/client" />

   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react-swc'

   // https://vitejs.dev/config/
   export default defineConfig({
     plugins: [react()],
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: ['./src/setupTests.ts'],
       coverage: {
         // https://vitest.dev/config/#coverage
         provider: 'v8',
         reporter: ['text', 'html', 'json'],
       },
     },
   })
   ```

   Create `setupTests.ts` in the `src` directory

   ```typescript
   import * as matchers from '@testing-library/jest-dom/matchers'
   import { expect } from 'vitest'

   expect.extend(matchers)
   ```

   Here, we bring Jest's DOM matchers into Vite, making testing feel more familiar and easier for users familiar with Jest.
   <br>
   To tell TypeScript to include type definitions for Vitest global variables and Jest DOM matchers add the following line to `tsconfig.json` in the `compilerOptions`:

   ```json
     "types": ["vitest/globals", "@testing-library/jest-dom"],
   ```

   and ensure to include the `.test` files in the `tsconfig.json`:

   ```json
   "include": ["src", "src/**/*.test.tsx", "src/**/*.test.ts"]
   ```

   Add vitest to the scripts in the `package.json`:

   ```json
   "test": "vitest",
   "test:coverage": "vitest --coverage",
   ```

5. Create first test
   Create a new file `App.test.tsx` in the `src` folder with this code:

   ```tsx
   import { screen, render } from '@testing-library/react'
   import App from './App'

   describe('App tests', () => {
     it('should render the title', () => {
       render(<App />)

       expect(
         screen.getByRole('heading', {
           level: 1,
         }),
       ).toHaveTextContent('Vite + React')
     })
   })
   ```

6. Setup path aliases
   Add following to the `tsconfig.json`:

   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["src/*"]
       }
     }
   }
   ```

   Add following to the `vite.config.ts`:

   ```ts
   import * as path from "path";
   ...
   resolve: {
     alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
   }
   ```

7. Setup husky pre-commit hook with lint-staged

   ```sh
   yarn add husky lint-staged --dev
   npx husky-init && yarn
   chmod +x .husky/pre-commit
   ```

   Replace `.husky/pre-commit` content with:

   ```sh
   #!/bin/sh
   . "$(dirname "$0")/_/husky.sh"
   npx lint-staged
   ```

   Add lint-staged to `package.json`

   ```json
   {
     "lint-staged": {
       "*.{js,jsx,ts,tsx,json,css,scss,md}": [
         "eslint --fix",
         "prettier --write"
       ]
     }
   }
   ```

### The project structure

Inspiration by this [Blog Post](https://www.robinwieruch.de/react-folder-structure/)

One folder for each react component

```
.
└── /src
    └── /App
        ├── /index.ts
        ├── /component.ts
        ├── /.test.ts
        └── /style.css
    └── /List
        ├── /index.ts
        ├── /component.ts
        ├── /.test.ts
        ├── /style.css
        ├── /hooks.ts
        └── /types.ts
```

- `component.js` holds actual implementation logic of the component
- `index.js` represents the public interface of the folder where everything gets exported that's relevant to the outside world.
- React hooks and types which are still only used by one component should remain in the component's file

In JavaScript, we can omit the `/index.js` for the imports, because it's the default:

```ts
import { List } from '@components/List'
```

Folder Structure:

```
.
└── /src
    ├── /assets
    └── /components
        ├── /ui
        ├── /form
        ├── /layout
    ├── /context
    ├── /data
    ├── /hooks
    ├── /pages
    ├── /services
    ├── index.tsx
    └── App.tsx
```

- `assets`
  contains all images, css files, font files, etc. for your project. Pretty much anything that isn't code related will be stored in this folder
- `components`
  contains general components that are reusable. Components is broken down into subfolders:
  - `ui`
    contains all our UI components like buttons, modals, cards, etc.
  - `form`
    form specific controls like checkboxes, inputs, date pickers, etc.
  - `layout`
    layout based components like sidebar, navbar, container, etc.
- `context`
  stores all your React context files that are used across multiple pages
- `data`
  data folder is similar to the assets folder, but this is for storing our data assets such as JSON files that contain information used in our code. Also contains global constant variables/environment variables.
- `hooks`
  stores global hooks that are used across multiple pages
- `pages`
  should contain one folder for each page in your application. Inside of those page specific folders should be a single root file that is your page (generally index.js) alongside all the files that are only applicable to that page
- `services`
  contains all utility functions like formatters, validators, helpers and code for interfacing with any external API

# Notes

- [Markdown supported languages for syntax highlighting](https://rust-lang.github.io/mdBook/format/theme/syntax-highlighting.html)

# Troubleshooting

- [Force LF eol in git repo and working copy](https://stackoverflow.com/questions/9976986/force-lf-eol-in-git-repo-and-working-copy)
