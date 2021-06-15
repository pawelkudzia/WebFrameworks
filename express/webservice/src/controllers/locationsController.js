import catchAsync from '../utils/catchAsync.js';
import Location from '../models/locationModel.js';

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

const locationsController = {
    getLocations
};

export default locationsController;
