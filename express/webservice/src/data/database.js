import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config({ path: '.env' });
const databaseName = process.env.DATABASE_NAME || 'measurements.sqlite3';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: databaseName
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connected to database: ${databaseName}.`);
    } catch (error) {
        console.error(`Unable to connect to database: ${databaseName}.`);
        console.error(`Error: ${error}`);
    }
};

const database = {
    sequelize,
    connect
};

export default database;
