import moment from 'moment';
import catchAsync from '../utils/catchAsync.js';
import measurementsMapper from '../utils/measurementsMapper.js';
import Measurement from '../models/measurementModel.js';
import AppError from '../utils/appError.js';
import Randomizer from '../utils/randomizer.js';

const getMeasurements = catchAsync(async (req, res, next) => {
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

    const measurementsDto = measurementsMapper.mapCollection(measurements);

    res.status(200).json(measurementsDto);
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

    const measurementDto = measurementsMapper.map(measurement);

    res.status(200).json(measurementDto);
});

const createMeasurement = catchAsync(async (req, res, next) => {
    let timestamp = req.body.timestamp || moment().unix();

    const measurement = await Measurement.create({
        parameter: req.body.parameter,
        value: req.body.value,
        timestamp: timestamp,
        locationId: req.body.locationId
    });

    const measurementDto = measurementsMapper.map(measurement);

    res.status(201).json(measurementDto);
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

    const measurementDto = measurementsMapper.map(measurement);

    res.status(200).json(measurementDto);
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

    const measurementDto = measurementsMapper.map(measurement);

    res.status(200).json(measurementDto);
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

    const measurementDto = measurementsMapper.mapWithLocation(measurement);

    res.status(200).json(measurementDto);
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

    const measurementsDto = measurementsMapper.mapCollection(measurements);

    res.status(200).json(measurementsDto);
});

const createRandomMeasurement = catchAsync(async (req, res, next) => {
    const measurement = await Measurement.create({
        parameter: 'pm10',
        value: Randomizer.getNumber(0, 101),
        timestamp: moment().unix(),
        locationId: Randomizer.getNumber(1, 11)
    });

    const measurementDto = measurementsMapper.map(measurement);

    res.status(201).json(measurementDto);
});

const updateRandomMeasurement = catchAsync(async (req, res, next) => {
    const id = Randomizer.getNumber(1, 10001);

    if (!Number.isInteger(id)) {
        return next(new AppError(`'id' parameter must be valid number.`, 400));
    }

    const measurement = await Measurement.findByPk(id);

    if (measurement === null) {
        return next(new AppError(`Measurement with id: ${id} was not found.`, 404));
    }
    
    measurement.parameter = 'pm10';
    measurement.value = Randomizer.getNumber(0, 101);
    measurement.timestamp = moment().unix();
    measurement.locationId = Randomizer.getNumber(1, 11);
    await measurement.save();
    
    const measurementDto = measurementsMapper.map(measurement);

    res.status(200).json(measurementDto);
});

const measurementsController = {
    getMeasurements,
    getMeasurementById,
    createMeasurement,
    updateMeasurement,
    deleteMeasurement,
    getRandomMeasurement,
    getRandomMeasurementWithLocation,
    getRandomMeasurementsByMultipleQueries,
    createRandomMeasurement,
    updateRandomMeasurement
};

export default measurementsController;
