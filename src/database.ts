import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
    POSTGRES_DB_TEST,
} = process.env 

const database = ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB


const client = new Pool({
    host: POSTGRES_HOST,
    database,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
})

export default client