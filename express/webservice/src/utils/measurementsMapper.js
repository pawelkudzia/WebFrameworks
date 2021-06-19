import moment from 'moment';

const map = (element) => {
    const timestamp = element.dataValues.timestamp;
    const dto = {
        id: element.dataValues.id,
        parameter: element.dataValues.parameter,
        value: element.dataValues.value,
        date: moment.unix(timestamp).tz('UTC').format('YYYY-MM-DDTHH:mm:ss') + 'Z',
        locationId: element.dataValues.locationId
    };

    return dto;
};

const mapCollection = (measurements) => {
    const measurementsDto = [];

    measurements.map(element => {
        const timestamp = element.dataValues.timestamp;
        const dto = {
            id: element.dataValues.id,
            parameter: element.dataValues.parameter,
            value: element.dataValues.value,
            date: moment.unix(timestamp).tz('UTC').format('YYYY-MM-DDTHH:mm:ss') + 'Z',
            locationId: element.dataValues.locationId
        };
        measurementsDto.push(dto);
    });

    return measurementsDto;
};

const mapWithLocation = (element) => {
    const timestamp = element.dataValues.timestamp;
    const dto = {
        id: element.dataValues.id,
        parameter: element.dataValues.parameter,
        value: element.dataValues.value,
        date: moment.unix(timestamp).tz('UTC').format('YYYY-MM-DDTHH:mm:ss') + 'Z',
        location: element.dataValues.location
    };

    return dto;
};

const measurementsMapper = {
    map,
    mapCollection,
    mapWithLocation
};

export default measurementsMapper;
