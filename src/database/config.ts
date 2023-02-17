import { client } from "./connection";

export const startDatabase = async(): Promise<void> => {
    await client.connect()
    console.log('Database Connected!');
}