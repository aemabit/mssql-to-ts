# MSSQL TO TS

`MSSQL TO TS` is a TypeScript generator tool for converting Microsoft SQL Server (MSSQL) database schemas into TypeScript interfaces. This tool is designed to automate the process of creating TypeScript types based on your database structure, making it easier to work with MSSQL databases in TypeScript projects.

## Installation

To install `MSSQL TO TS`, you need to have Node.js installed on your system. Once Node.js is installed, you can install `MSSQL TO TS` using npm:

```bash
npm install mssql-to-ts
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

