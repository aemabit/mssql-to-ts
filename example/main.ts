import { generator } from "mssql-ts";

generator({
    config: {
        client: "mssql",
        connection: {
            host: "localhost",
            user: "user",
            password: "password",
            database: "my_db"
        },
    },
    path: "./",
    capitalizeTypes: true,
    customFileName: 'customFileName'
});
