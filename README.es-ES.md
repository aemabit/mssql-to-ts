

# MSSQL TS

`MSSQL TS` es una herramienta generadora de TypeScript para convertir esquemas de bases de datos de Microsoft SQL Server (MSSQL) en interfaces de TypeScript. Esta herramienta está diseñada para automatizar el proceso de creación de tipos de TypeScript basados en la estructura de tu base de datos, facilitando el trabajo con bases de datos MSSQL en proyectos de TypeScript.

## Primeros pasos

Para comenzar a usar MSSQL TS, simplemente instala el paquete, configúralo para conectarse a tu base de datos MSSQL y ejecuta el generador.

## Instalación

Para instalar `MSSQL TS`, necesitas tener Node.js instalado en tu sistema. Una vez que Node.js esté instalado, puedes instalar `MSSQL TS` usando npm:

```bash
npm i mssql-ts -D
# Or Yarn
yarn add mssql-ts --dev
# Or pnpm
pnpm add mssql-ts -D
```

## Ejemplo de uso

```ts
import { generator } from "mssql-ts";

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
    capitalizeTypes: true,
    path: `${__dirname}/src`,
    customFileName: "MSSQLTypes"
});
```
## Configuración

La función generadora acepta un objeto de configuración con las siguientes propiedades:

- **config:** Objeto de configuración de la base de datos.
- **client:** Especifica el cliente de la base de datos (debe ser "mssql").
- **connection:** Detalles de conexión a la base de datos, incluidos host, usuario, contraseña y base de datos.
- **capitalizeTypes:** (Opcional) Una bandera booleana para determinar si los tipos de TypeScript deben estar en mayúscula. El valor predeterminado es true.
- **path:** La ruta del directorio donde se guardarán las interfaces de TypeScript generadas.
- **customFileName:** Nombre del archivo de salida generado por la herramienta generadora de TypeScript MSSQL TS al convertir esquemas de bases de datos de Microsoft SQL Server (MSSQL) en interfaces de TypeScript; el nombre del archivo puede variar según tu configuración o implementación dentro de la herramienta.

Para obtener información más detallada sobre la configuración y las opciones, consulta la [documentación de Knex.js](https://knexjs.org/guide/).

## Scripts

Para generar las interfaces de TypeScript a partir del esquema de tu base de datos MSSQL, puedes usar el siguiente comando de script en el archivo package.json de tu proyecto:

```
"scripts": {
    "mssql-ts-generate": "<ts-node || tsx> main.ts"
}
```

Reemplaza `<ts-node || tsx>` con ts-node si estás usando archivos de TypeScript estándar, o tsx si estás usando TypeScript con la sintaxis React JSX. Asegúrate de que main.ts apunte correctamente a tu archivo de script que contiene la llamada a la función generadora.

## Características principales

- **Conversión automatizada de esquemas:** Genera automáticamente interfaces de TypeScript a partir de esquemas de bases de datos MSSQL, asegurando que tu código de TypeScript permanezca sincronizado con la estructura de tu base de datos.
- **Salida personalizable:** Ofrece opciones para capitalizar las definiciones de tipos y especificar directorios de salida, permitiendo una experiencia de desarrollo a medida.
- **Integración fluida:** Diseñada para integrarse sin problemas en proyectos de TypeScript existentes, lo que la convierte en una opción ideal para desarrolladores que trabajan con bases de datos MSSQL.
- **Eficiencia mejorada en el desarrollo:** Reduce la carga de trabajo manual de escribir interfaces de TypeScript para tablas de base de datos, acelerando el proceso de desarrollo y minimizando errores humanos.

## Caso de uso ideal

MSSQL TS es ideal para desarrolladores y equipos que trabajan en aplicaciones de TypeScript que interactúan con bases de datos MSSQL. Ya sea que estés desarrollando aplicaciones de nivel empresarial, trabajando en un proyecto personal o algo intermedio, esta herramienta puede optimizar significativamente tu proceso de desarrollo.
