using AutoMapper;
using WebApi.Dtos;
using WebApi.Models;

namespace WebApi.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Location, LocationReadDto>();
            CreateMap<LocationCreateDto, Location>();
            CreateMap<LocationUpdateDto, Location>();
            
            CreateMap<Measurement, MeasurementReadDto>();
            CreateMap<Measurement, MeasurementWithLocationReadDto>();
            CreateMap<MeasurementCreateDto, Measurement>();
            CreateMap<MeasurementUpdateDto, Measurement>();
        }
    }
}
