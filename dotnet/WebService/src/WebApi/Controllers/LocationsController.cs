using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.Dtos;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/locations")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public LocationsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<LocationReadDto>> GetLocations([FromQuery] QueryStringParameters queryStringParameters)
        {
            int skip = (queryStringParameters.Page - 1) * queryStringParameters.Limit;

            var locations = _context.Locations
                .OrderBy(x => x.Id)
                .Skip(skip)
                .Take(queryStringParameters.Limit);

            var locationReadDto = _mapper.Map<IEnumerable<LocationReadDto>>(locations);

            return Ok(locationReadDto);
        }

        [HttpGet("{id}", Name = "GetLocationById")]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<LocationReadDto> GetLocationById([FromRoute] int id)
        {
            var location = _context.Locations.FirstOrDefault(l => l.Id == id);

            if (location == null) return NotFound();

            var locationReadDto = _mapper.Map<LocationReadDto>(location);

            return Ok(locationReadDto);
        }

        [HttpPost]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<LocationReadDto> CreateLocation([FromBody] LocationCreateDto locationCreateDto)
        {
            var location = _mapper.Map<Location>(locationCreateDto);
            _context.Locations.Add(location);
            _context.SaveChanges();

            var locationReadDto = _mapper.Map<LocationReadDto>(location);

            return CreatedAtRoute(nameof(GetLocationById), new { locationReadDto.Id }, locationReadDto);
        }

        [HttpPut("{id}")]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<LocationReadDto> UpdateLocation([FromRoute] int id, [FromBody] LocationUpdateDto locationUpdateDto)
        {
            var location = _context.Locations.FirstOrDefault(l => l.Id == id);

            if (location == null) return NotFound();

            _mapper.Map(locationUpdateDto, location);
            _context.SaveChanges();

            var locationReadDto = _mapper.Map<LocationReadDto>(location);

            return Ok(locationReadDto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeleteLocation([FromRoute] int id)
        {
            var location = _context.Locations.FirstOrDefault(l => l.Id == id);

            if (location == null) return NotFound();

            _context.Remove(location);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
