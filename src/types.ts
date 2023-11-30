import { writeFile } from 'fs/promises';
import { toCapitalCase, transform } from './helpers';
import { DataTypeSQL, TableViewSQL } from './SQL';
export type KeyTypes = {
    ts: string[];
    keys: {
        customType: string;
        key: string;
    }[];
}

export const generateKeyTs =  (dataTypes: DataTypeSQL[]) => {

    const types: KeyTypes = {
        ts: [],
        keys: [],
    };

    dataTypes.forEach((dataType) => {

        const { type } = transform(dataType.DATA_TYPE);

        types.ts.push(`export type ${toCapitalCase(dataType.DOMAIN_NAME)} = ${type}${
            dataType.IS_NULLABLE ? ' | null' : ''
        };`);

        types.keys.push({
            customType: toCapitalCase(dataType.DOMAIN_NAME),
            key: dataType.DOMAIN_NAME,
        });
    });

    return types;
};

export const generateTS = async (keys: KeyTypes, tableView: TableViewSQL[] ) => {

    const tablesAndViews = tableView.map((table) => table.TABLE_NAME);

    const types: any = {};

    for (const table of tablesAndViews) {

        const columns = tableView.filter((column) => column.TABLE_NAME === table);

        const keysTs = columns.map((column) => {

            const { type } = transform(column.DOMAIN_NAME || column.DATA_TYPE);
            const isCustomType = keys.keys.find((k) => k.key === column.DOMAIN_NAME);

            return `${column.COLUMN_NAME}: ${isCustomType?.customType ?? type}${
                column.IS_NULLABLE === 'YES' ? ' | null' : ''
            }`;
        });
        types[table] = keysTs;
    }

    const ts: any[] = [
        ...keys.ts
    ];

    Object.entries(types).forEach(([key, value]: any) => {

        ts.push(`export type ${toCapitalCase(key)} = {
            ${value.join(',\n')}
        };`);
    });

    await writeFile(
        `${__dirname}/generated/ModelTypes.ts`,
        ts.join('\n').replace(/,/g, '')
    );

    return;
};




