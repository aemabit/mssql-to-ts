import { writeFile } from "fs/promises";
import { toCapitalCase, transform } from "./helpers";
import { DataTypeSQL, SchemaSQL } from "./SQL";
export type KeyTypes = {
    ts: string[];
    keys: {
        customType: string;
        key: string;
    }[];
};

export const generateKeyTs = (
    dataTypes: DataTypeSQL[],
    capitalizeTypes: boolean
) => {
    const types: KeyTypes = {
        ts: [],
        keys: [],
    };

    dataTypes.forEach((dataType) => {
        const { type } = transform(dataType.DATA_TYPE);

        let cType = dataType.DOMAIN_NAME ;

        if (capitalizeTypes) {
            cType = toCapitalCase(cType + 'Key');
        }

        types.ts.push(
            `export type ${cType} = ${type}${
                dataType.IS_NULLABLE ? " | null" : ""
            };`
        );

        types.keys.push({
            customType: `${cType}`,
            key: dataType.DOMAIN_NAME,
        });
    });

    return types;
};

export const generateTS = async (
    keys: KeyTypes,
    tableView: SchemaSQL[],
    capitalizeTypes: boolean
) => {
    const tablesAndViews = tableView.map((table) => table.SCHEMA_NAME);

    const types: any = {};

    for (const table of tablesAndViews) {
        const columns = tableView.filter(
            (column) => column.SCHEMA_NAME === table
        );

        const keysTs = columns.map((column) => {
            const { type } = transform(column.DOMAIN_NAME || column.DATA_TYPE);
            const isCustomType = keys.keys.find(
                (k) => k.key === column.DOMAIN_NAME
            );

            let attribute = column.ATTRIBUTE_NAME;

            if (attribute.includes("@")) {
                attribute = attribute.replace(/@/g, "");
            }

            return `${attribute}: ${isCustomType?.customType ?? type}${
                column.IS_NULLABLE === "YES" ? " | null" : ""
            }`;
        });
        types[table] = keysTs;
    }

    const ts: any[] = [...keys.ts];

    Object.entries(types).forEach(([key, value]: any) => {
        let kType = key;

        if (capitalizeTypes) {
            kType = toCapitalCase(kType);
        }

        ts.push(`export type ${kType} = {
            ${value.join(",\n")}
        };`);
    });

    await writeFile(
        `${__dirname}/generated/ModelTypes.ts`,
        ts.join("\n").replace(/,/g, "")
    );

    return;
};
