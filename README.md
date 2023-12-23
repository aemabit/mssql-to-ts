# MSSQL TO TS

`MSSQL TO TS` is a TypeScript generator tool for converting Microsoft SQL Server (MSSQL) database schemas into TypeScript interfaces. This tool is designed to automate the process of creating TypeScript types based on your database structure, making it easier to work with MSSQL databases in TypeScript projects.

## Getting Started

To start using MSSQL TO TS, simply install the package, configure it to connect to your MSSQL database, and run the generator.

## Installation

To install `MSSQL TO TS`, you need to have Node.js installed on your system. Once Node.js is installed, you can install `MSSQL TO TS` using npm:

```bash
npm i mssql-ts -D
# Or Yarn
yarn add mssql-ts --dev
# Or pnpm
pnpm add mssql-ts -D
```

## Sample Usage

```ts
import { generator } from "mssql-to-ts";

generator({
    config: {
        client: "mssql",
        connection: {
            host: "localhost",
            user: "username",
            password: "password",
            database: "my_db"
        },
    },
    capitalizeTypes: true, // Set to false if you don't want types to be capitalized
    path: `${__dirname}/src`, // Directory path to host the generated TypeScript interfaces
});
```
## Configuration

The generator function accepts a configuration object with the following properties:

- **config:** Database configuration object.
- **client:** Specifies the database client (must be "mssql").
- **connection:** Database connection details including host, user, password, and database.
- **capitalizeTypes:** (Optional) A boolean flag to determine if the TypeScript types should be capitalized. Defaults to true.
- **path:** The directory path where the generated TypeScript interfaces will be saved.

For more detailed configuration settings and options, see the [Knex.js documentation](https://knexjs.org/guide/).

## Scripts

To generate the TypeScript interfaces from your MSSQL database schema, you can use the following script command in your project's package.json file:

```
"scripts": {
    "mssql-ts-generate": "<ts-node || tsx> main.ts"
}
```

Replace `<ts-node || tsx>` with ts-node if you are using standard TypeScript files, or tsx if you are using TypeScript with React JSX syntax. Ensure that main.ts is correctly pointing to your script file that contains the generator function call.

## Key Features

- **Automated Schema Conversion:** Automatically generates TypeScript interfaces from MSSQL database schemas, ensuring that your TypeScript code remains synchronized with your database structure.
- **Customizable Output:** Offers options to capitalize type definitions and specify output directories, allowing for a tailored development experience.
- **Seamless Integration:** Designed to integrate smoothly into existing TypeScript projects, making it an ideal choice for developers working with MSSQL databases.
- **Enhanced Development Efficiency:** Reduces the manual workload of writing TypeScript interfaces for database tables, speeding up the development process and minimizing human error.

## Ideal Use Case

MSSQL TO TS is perfect for developers and teams working on TypeScript applications that interact with MSSQL databases. Whether you're building enterprise-level applications, working on a personal project, or anywhere in between, this tool can significantly streamline your development process.

