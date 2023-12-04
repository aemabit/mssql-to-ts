import { gen } from "./src/main";

const knexConfig = {
    client: "mssql",
    connection: {
        host: "localhost",
        user: "sa",
        password: "example_123",
        database: "outwestluxury_test",
    },
};

gen({
    knexConfig,
    capitalizeTypes: true,
});
