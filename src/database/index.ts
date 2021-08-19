import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    return createConnection(defaultOptions)
}

// npm run typeorm migration:generate -- -n <nome-migration>
// npm run typeorm migration:run
