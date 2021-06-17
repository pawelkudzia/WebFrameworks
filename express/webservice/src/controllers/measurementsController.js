import moment from 'moment';
import catchAsync from '../utils/catchAsync.js';
import Measurement from '../models/measurementModel.js';
import AppError from '../utils/appError.js';

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

    res.status(200).json(measurement);
});

const createMeasurement = catchAsync(async (req, res, next) => {
    const measurement = await Measurement.create({
        parameter: req.body.parameter,
        value: req.body.value,
        date: req.body.date,
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

    const updateDate = req.body.date || moment().local().format('YYYY-MM-DDTHH:mm:ss.SSS');
    const newDate = moment(updateDate).local().format('YYYY-MM-DDTHH:mm:ss.SSS');
    console.log('updateDate', updateDate);
    console.log('newDate', newDate);

    measurement.parameter = req.body.parameter;
    measurement.value = req.body.value;
    measurement.date = newDate;
    measurement.locationId = req.body.locationId;
    await measurement.save();

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

const measurementsController = {
    getMeasurements,
    getMeasurementById,
    createMeasurement,
    updateMeasurement,
    deleteMeasurement
};

export default measurementsController;
