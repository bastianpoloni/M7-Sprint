import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    user : 'bastianpoloni',
    password : '',
    database : 'bancosolar',
    port : 5432
});

pool.connect();

export { pool };