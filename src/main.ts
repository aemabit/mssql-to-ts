import Knex from "knex";
import { generateKeyTs, generateTS } from "./types";
import {
    DataTypesQuerySQL,
    NativeDataTypesQuerySQL,
    StoreProceduresQuerySQL,
    TablesAndViewsQuerySQL,
} from "./SQL";
import { DataTypeSQL, NativeSQLDataType, TableViewSQL } from "./SQL";

const knexConfig = {
    client: "mssql",
    connection: {
        host: "localhost",
        user: "sa",
        password: "example_123",
        database: "outwestluxury_test",
    },
};

const knex = Knex(knexConfig);

export const gen = async () => {
    try {
        // const nativeDataTypes: NativeSQLDataType[] = await knex.raw(
        //     NativeDataTypesQuerySQL
        // );

        const dataTypes: DataTypeSQL[] = await knex.raw(DataTypesQuerySQL);

        const tablesAndViews: TableViewSQL[] = await knex.raw(
            TablesAndViewsQuerySQL
        );

        // const storeProcedures: TableViewSQL[] = await knex.raw(
        //     StoreProceduresQuerySQL
        // );

        console.log("Generating types...");
        const keysTs = generateKeyTs(dataTypes);
        await generateTS(keysTs, tablesAndViews);

        console.log("-------------------------");
        console.log("Types generated!");
        return process.exit(0);
    } catch (error) {
        console.log("-------------------------");
        console.error("Error generating database!");
        console.error(error);
        console.log("-------------------------");
        process.exit(1);
    }
};
