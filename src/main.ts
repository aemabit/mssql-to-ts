import Knex, { Knex as K } from "knex";
import { generateKeyTs, generateTS } from "./generator";
import {
    DataTypesQuerySQL,
    StoreProceduresQuerySQL,
    TablesAndViewsQuerySQL,
} from "./SQL";
import { DataTypeSQL, NativeSQLDataType, SchemaSQL } from "./SQL";


export interface InternalConfig extends K.Config {
    client: 'mssql';
}

export interface Config {
    path: string;
    config: InternalConfig;
    capitalizeTypes?: boolean; // default: true
}

export const generator = async ({ config, capitalizeTypes = true, path }: Config) => {
    try {
        const knex = Knex(config);

        const dataTypes: DataTypeSQL[] = await knex.raw(DataTypesQuerySQL);

        const tablesAndViews: SchemaSQL[] = await knex.raw(
            TablesAndViewsQuerySQL
        );

        const storeProcedures: SchemaSQL[] = await knex.raw(
            StoreProceduresQuerySQL
        );

        const keysTs = generateKeyTs(dataTypes, capitalizeTypes);
        await generateTS(
            keysTs,
            [...tablesAndViews, ...storeProcedures],
            capitalizeTypes,
            path
        );

        console.log("\n");
        console.log(`✔ Generated to ${path} successfully!`);
        console.log("\n");
        return process.exit(0);
    } catch (error) {
        console.log("");
        console.error("Error generating types!");
        console.error(error);
        console.log("");
        process.exit(1);
    }
};
