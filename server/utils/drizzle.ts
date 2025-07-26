import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../database/schema';
import { neon } from '@neondatabase/serverless';
const { dbhost } = useRuntimeConfig();

export function useDrizzle() {
    const sql = neon(dbhost);
    return drizzle({ client: sql, schema });
}
