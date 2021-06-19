const map = (element) => {
    const dto = {
        id: element.dataValues.id,
        city: element.dataValues.city,
        country: element.dataValues.country,
        latitude: element.dataValues.latitude,
        longitude: element.dataValues.longitude,
    };

    return dto;
};

const mapCollection = (locations) => {
    const locationsDto = [];

    locations.map(element => {
        const dto = {
            id: element.dataValues.id,
            city: element.dataValues.city,
            country: element.dataValues.country,
            latitude: element.dataValues.latitude,
            longitude: element.dataValues.longitude,
        };
        locationsDto.push(dto);
    });

    return locationsDto;
};

const locationsMapper = {
    map,
    mapCollection,
};

export default locationsMapper;
