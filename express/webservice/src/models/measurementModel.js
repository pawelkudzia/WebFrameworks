import { Sequelize } from 'sequelize';
import database from '../data/database.js';
import Location from './locationModel.js';

const { DataTypes } = Sequelize; 

const options = {
    tableName: 'measurements',
    timestamps: false
};

const Measurement = database.sequelize.define('Measurement', {
    parameter: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1, 10]
        }
    },
    value: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            min: 0.0,
            max: 100.0
        }
    },
    timestamp: {
        type: DataTypes.INTEGER
    },
    locationId: {
        type: DataTypes.INTEGER,
        references: {
            model: Location,
            key: 'id'
        }
    }
}, options);

export default Measurement;
