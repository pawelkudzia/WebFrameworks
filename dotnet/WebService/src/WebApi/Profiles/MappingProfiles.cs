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

            CreateMap<Measurement, MeasurementReadDto>()
                .ForMember(dto => dto.Date, entity => entity.MapFrom(e => e.Date.ToString("yyyy-MM-ddTHH:mm:ss.fff")));

            CreateMap<Measurement, MeasurementWithLocationReadDto>();
            CreateMap<MeasurementCreateDto, Measurement>();
            CreateMap<MeasurementUpdateDto, Measurement>();
        }
    }
}
