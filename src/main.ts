import Knex, { Knex as K } from "knex";
import { generateKeyTs, generateTS } from "./types";
import {
    DataTypesQuerySQL,
    NativeDataTypesQuerySQL,
    StoreProceduresQuerySQL,
    TablesAndViewsQuerySQL,
} from "./SQL";
import { DataTypeSQL, NativeSQLDataType, SchemaSQL } from "./SQL";

export interface Config {
    knexConfig: K.Config;
    capitalizeTypes?: boolean; // default: true
}

export const gen = async ({ knexConfig, capitalizeTypes = true }: Config) => {
    try {
        const knex = Knex(knexConfig);

        // const nativeDataTypes: NativeSQLDataType[] = await knex.raw(
        //     NativeDataTypesQuerySQL
        // );

        const dataTypes: DataTypeSQL[] = await knex.raw(DataTypesQuerySQL);

        const tablesAndViews: SchemaSQL[] = await knex.raw(
            TablesAndViewsQuerySQL
        );

        const storeProcedures: SchemaSQL[] = await knex.raw(
            StoreProceduresQuerySQL
        );

        console.log("Generating types...");
        const keysTs = generateKeyTs(dataTypes, capitalizeTypes);
        await generateTS(
            keysTs,
            [...tablesAndViews, ...storeProcedures],
            capitalizeTypes
        );

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
