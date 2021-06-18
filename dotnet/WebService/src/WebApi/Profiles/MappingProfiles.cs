using System;
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
                .ForMember(dto => dto.Date, entity => entity.MapFrom(e => DateTimeOffset.FromUnixTimeSeconds(e.Timestamp).UtcDateTime));

            CreateMap<Measurement, MeasurementWithLocationReadDto>()
                .ForMember(dto => dto.Date, entity => entity.MapFrom(e => DateTimeOffset.FromUnixTimeSeconds(e.Timestamp).UtcDateTime));

            CreateMap<MeasurementCreateDto, Measurement>();
            CreateMap<MeasurementUpdateDto, Measurement>();
        }
    }
}
