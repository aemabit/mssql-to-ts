
export type DataTypeSQL = {
  DOMAIN_NAME: string
  DATA_TYPE: string
  CHARACTER_MAXIMUM_LENGTH: number
  NUMERIC_PRECISION: number
  IS_NULLABLE: string | null
}

export type SchemaSQL = DataTypeSQL & {
  SCHEMA_NAME: string
  ATTRIBUTE_NAME: string
  ORDINAL_POSITION: number
  COLUMN_DEFAULT: string | null
  NUMERIC_SCALE: number | null
  DATETIME_PRECISION: number | null
}

export type NativeSQLDataType = {
  name: string
  is_user_defined: boolean
}

export const DataTypesQuerySQL = `
SELECT
  DISTINCT(DOMAIN_NAME),
  DATA_TYPE,
  CHARACTER_MAXIMUM_LENGTH,
  NUMERIC_PRECISION
FROM information_schema.columns
WHERE DOMAIN_NAME IS NOT NULL
`;


export const TablesAndViewsQuerySQL = `
SELECT
  TABLE_NAME as SCHEMA_NAME,
  COLUMN_NAME as ATTRIBUTE_NAME,
  DATA_TYPE,
  DOMAIN_NAME,
  ORDINAL_POSITION,
  COLUMN_DEFAULT,
  IS_NULLABLE,
  CHARACTER_MAXIMUM_LENGTH,
  NUMERIC_PRECISION,
  NUMERIC_SCALE,
  DATETIME_PRECISION
FROM information_schema.columns
`

export const NativeDataTypesQuerySQL = `
SELECT
  name,
  is_user_defined
FROM
  sys.types
WHERE is_user_defined = 0
`

export const StoreProceduresQuerySQL = `
SELECT
  SPECIFIC_NAME as SCHEMA_NAME,
  PARAMETER_NAME as ATTRIBUTE_NAME,
  ORDINAL_POSITION,
  DATA_TYPE,
  USER_DEFINED_TYPE_NAME as DOMAIN_NAME
FROM information_schema.parameters
WHERE IS_RESULT = 'NO'
`