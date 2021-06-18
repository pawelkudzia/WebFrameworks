import moment from 'moment';
import catchAsync from '../utils/catchAsync.js';
import Measurement from '../models/measurementModel.js';
import AppError from '../utils/appError.js';
import Randomizer from '../utils/randomizer.js';
import Location from '../models/locationModel.js';

const getMeasurements = catchAsync(async (req, res, next) => {
    // cast to numeric value
    const queryPage = req.query.page * 1 || 1;
    const queryLimit = req.query.limit * 1 || 10;

    const page = queryPage < 1 ? 1 : queryPage;
    const limit = (queryLimit < 1) || (queryLimit > 1000) ? 10 : queryLimit;
    const skip = (page - 1) * limit;

    const measurements = await Measurement.findAll({
        order: ['id'],
        offset: skip,
        limit: limit
    });

    measurements.map(element => {
        const timestamp = element.dataValues.timestamp;
        element.dataValues.date = moment.unix(timestamp).tz('UTC').format('YYYY-MM-DDTHH:mm:ss') + 'Z';
        delete element.dataValues.timestamp;
    });

    res.status(200).json(measurements);
});

const getMeasurementById = catchAsync(async (req, res, next) => {
    const id = req.params.id * 1;

    if (!Number.isInteger(id)) {
        return next(new AppError(`'id' parameter must be valid number.`, 400));
    }

    const measurement = await Measurement.findByPk(id);

    if (measurement === null) {
        return next(new AppError(`Measurement with id: ${id} was not found.`, 404));
    }

    const timestamp = measurement.dataValues.timestamp;
    measurement.dataValues.date = moment.unix(timestamp).tz('UTC').format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    delete measurement.dataValues.timestamp;

    res.status(200).json(measurement);
});

const createMeasurement = catchAsync(async (req, res, next) => {
    const timestamp = req.body.timestamp || moment().unix();

    const measurement = await Measurement.create({
        parameter: req.body.parameter,
        value: req.body.value,
        timestamp: timestamp,
        locationId: req.body.locationId
    });

    res.status(201).json(measurement);
});

const updateMeasurement = catchAsync(async (req, res, next) => {
    const id = req.params.id * 1;

    if (!Number.isInteger(id)) {
        return next(new AppError(`'id' parameter must be valid number.`, 400));
    }

    let measurement = await Measurement.findByPk(id);

    if (measurement === null) {
        return next(new AppError(`Measurement with id: ${id} was not found.`, 404));
    }

    measurement.parameter = req.body.parameter;
    measurement.value = req.body.value;
    measurement.timestamp = req.body.timestamp || moment().unix();
    measurement.locationId = req.body.locationId;
    await measurement.save();

    const timestamp = measurement.dataValues.timestamp;
    measurement.dataValues.date = moment.unix(timestamp).tz('UTC').format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    delete measurement.dataValues.timestamp;

    res.status(200).json(measurement);
});

const deleteMeasurement = catchAsync(async (req, res, next) => {
    const id = req.params.id * 1;

    if (!Number.isInteger(id)) {
        return next(new AppError(`'id' parameter must be valid number.`, 400));
    }

    let measurement = await Measurement.findByPk(id);

    if (measurement === null) {
        return next(new AppError(`Measurement with id: ${id} was not found.`, 404));
    }

    await measurement.destroy();

    res.status(204).send();
});

const getRandomMeasurement = catchAsync(async (req, res, next) => {
    const id = Randomizer.getNumber(1, 10001);

    if (!Number.isInteger(id)) {
        return next(new AppError(`'id' parameter must be valid number.`, 400));
    }

    const measurement = await Measurement.findByPk(id);

    if (measurement === null) {
        return next(new AppError(`Measurement with id: ${id} was not found.`, 404));
    }

    const timestamp = measurement.dataValues.timestamp;
    measurement.dataValues.date = moment.unix(timestamp).tz('UTC').format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    delete measurement.dataValues.timestamp;

    res.status(200).json(measurement);
});

const getRandomMeasurementWithLocation = catchAsync(async (req, res, next) => {
    const id = Randomizer.getNumber(1, 10001);

    if (!Number.isInteger(id)) {
        return next(new AppError(`'id' parameter must be valid number.`, 400));
    }

    const measurement = await Measurement.findByPk(id, { include: 'location' });

    if (measurement === null) {
        return next(new AppError(`Measurement with id: ${id} was not found.`, 404));
    }

    const timestamp = measurement.dataValues.timestamp;
    measurement.dataValues.date = moment.unix(timestamp).tz('UTC').format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    delete measurement.dataValues.timestamp;
    delete measurement.dataValues.locationId;

    res.status(200).json(measurement);
});

const getRandomMeasurementsByMultipleQueries = catchAsync(async (req, res, next) => {
    let count = req.query.count * 1;

    if (!Number.isInteger(count)) {
        return next(new AppError(`'count' parameter must be valid number.`, 400));
    }
    
    count = (count < 1) || (count > 100) ? 1 : count;
    
    let measurements = [];
    
    while (count > 0) {
        const randomId = Randomizer.getNumber(1, 10001);
        const measurement = await Measurement.findByPk(randomId)
        measurements.push(measurement);
        count--;
    }
    
    measurements = measurements.sort((a, b) => {
        return a.dataValues.id - b.dataValues.id;
    });

    measurements.map(element => {
        const timestamp = element.dataValues.timestamp;
        element.dataValues.date = moment.unix(timestamp).tz('UTC').format('YYYY-MM-DDTHH:mm:ss') + 'Z';
        delete element.dataValues.timestamp;
    });

    res.status(200).json(measurements);
});

const measurementsController = {
    getMeasurements,
    getMeasurementById,
    createMeasurement,
    updateMeasurement,
    deleteMeasurement,
    getRandomMeasurement,
    getRandomMeasurementWithLocation,
    getRandomMeasurementsByMultipleQueries
};

export default measurementsController;
