import catchAsync from '../utils/catchAsync.js';
import Location from '../models/locationModel.js';
import AppError from '../utils/appError.js';

const getLocations = catchAsync(async (req, res, next) => {
    // cast to numeric value
    const queryPage = req.query.page * 1 || 1;
    const queryLimit = req.query.limit * 1 || 10;

    const page = queryPage < 1 ? 1 : queryPage;
    const limit = (queryLimit < 1) || (queryLimit > 1000) ? 10 : queryLimit;
    const skip = (page - 1) * limit;

    const locations = await Location.findAll({
        order: ['id'],
        offset: skip,
        limit: limit
    });

    res.status(200).json(locations);
});

const getLocationById = catchAsync(async (req, res, next) => {
    const id = req.params.id * 1;

    if (!Number.isInteger(id)) {
        return next(new AppError(`'id' parameter must be valid number.`, 400));
    }

    const location = await Location.findByPk(id);

    if (location === null) {
        return next(new AppError(`Location with id: ${id} was not found.`, 404));
    }

    res.status(200).json(location);
});

const createLocation = catchAsync(async (req, res, next) => {
    const location = await Location.create({
        city: req.body.city,
        country: req.body.country,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    res.status(201).json(location);
});

const updateLocation = catchAsync(async (req, res, next) => {
    const id = req.params.id * 1;

    if (!Number.isInteger(id)) {
        return next(new AppError(`'id' parameter must be valid number.`, 400));
    }

    let location = await Location.findByPk(id);

    if (location === null) {
        return next(new AppError(`Location with id: ${id} was not found.`, 404));
    }

    location.city = req.body.city;
    location.country = req.body.country;
    location.latitude = req.body.latitude;
    location.longitude = req.body.longitude;
    await location.save();

    res.status(200).json(location);
});

const locationsController = {
    getLocations,
    getLocationById,
    createLocation,
    updateLocation
};

export default locationsController;
