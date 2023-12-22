export const transformValue: Record<string, string> = {
    bigint: "number",
    binary: "number",
    bit: "number",
    char: "string",
    date: "Date",
    datetime: "Date",
    datetime2: "Date",
    datetimeoffset: "Date",
    decimal: "number",
    float: "number",
    geography: "string",
    geometry: "string",
    image: "string",
    int: "number",
    money: "string",
    nchar: "string",
    ntext: "string",
    numeric: "number",
    nvarchar: "string",
    smalldatetime: "Date",
    smallint: "number",
    smallmoney: "string",
    text: "string",
    time: "Date",
    timestamp: "Date",
    tinyint: "number",
    varchar: "string",
    xml: "string",
};

export const transform = (value: string) => {
    let type = "";

    const regularKeys = Object.keys(transformValue);

    for (const key of regularKeys) {
        if (value.includes(key)) {
            type = transformValue[key];
        }
    }

    return { type };
};

export const toCapitalCase = (str: string) => {
    return str
        .replace(/[_\-]+/g, " ")
        .split(" ")
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join("");
};
