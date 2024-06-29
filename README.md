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

# Notes

- [Markdown supported languages for syntax highlighting](https://rust-lang.github.io/mdBook/format/theme/syntax-highlighting.html)

# Troubleshooting

- [Force LF eol in git repo and working copy](https://stackoverflow.com/questions/9976986/force-lf-eol-in-git-repo-and-working-copy)
