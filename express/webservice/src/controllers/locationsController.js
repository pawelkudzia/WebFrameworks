import catchAsync from '../utils/catchAsync.js';
import locationsMapper from '../utils/locationsMapper.js';
import Location from '../models/locationModel.js';
import AppError from '../utils/appError.js';

const getLocations = catchAsync(async (req, res, next) => {
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

    const locationsDto = locationsMapper.mapCollection(locations);

    res.status(200).json(locationsDto);
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

    const locationDto = locationsMapper.map(location);

    res.status(200).json(locationDto);
});

const createLocation = catchAsync(async (req, res, next) => {
    const location = await Location.create({
        city: req.body.city,
        country: req.body.country,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    const locationDto = locationsMapper.map(location);

    res.status(201).json(locationDto);
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

    const locationDto = locationsMapper.map(location);

    res.status(200).json(locationDto);
});

const deleteLocation = catchAsync(async (req, res, next) => {
    const id = req.params.id * 1;

    if (!Number.isInteger(id)) {
        return next(new AppError(`'id' parameter must be valid number.`, 400));
    }

    let location = await Location.findByPk(id);

    if (location === null) {
        return next(new AppError(`Location with id: ${id} was not found.`, 404));
    }

    await location.destroy();

    res.status(204).send();
});

const locationsController = {
    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
};

export default locationsController;
