# playground
A basic app with:
- React typescript frontend
- Node.js & Express typescript backend
- yarn package manager

## Backend Setup Typescript with Node.js and Typescript

1. Initialize new node.js project
    ```
    mkdir backend
    cd backend
    yarn init -y
    ```

2. Install express, typescript and related dependencies
    ```
    yarn add express
    yarn add -D @types/express typescript ts-node
    ```
    - `typescript`: The TypeScript compiler<br>
    - `ts-node`: Enables running TypeScript files directly with Node.js
    - `@types/express`: Provides TypeScript definitions for Express

3. Create `tsconfig.json` file in project root
    ```
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
    ```
    import express from 'express';

    const app = express();
    const port = 3000;

    app.get('/', (req, res) => {
        res.send('Hello, TypeScript with Express!');
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
    ```

5. Update the `package.json` file
    ```
        "scripts": {
            "start": "ts-node src/index.ts"
        },
    ```

6. Add nodemon
    `yarn add -D nodemon`<br>

    Update scripts in `package.json` file
    ```
    "scripts": {
        "start-watch": "nodemon --watch \"*.ts\" --exec \"ts-node\" ./src/index.ts",
    },
    ```

## Frontend Setup