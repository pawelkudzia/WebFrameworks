import { Sequelize } from 'sequelize';
import database from '../data/database.js';

const { DataTypes } = Sequelize; 

const options = {
    tableName: 'locations',
    timestamps: false
};

const Location = database.sequelize.define('Location', {
    city: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    },
    country: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            min: -90.0,
            max: 90.0
        }
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            min: -180.0,
            max: 180.0
        }
    }
}, options);

export default Location;
