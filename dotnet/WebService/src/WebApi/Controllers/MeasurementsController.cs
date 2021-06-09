using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.Dtos;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/measurements")]
    [ApiController]
    public class MeasurementsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public MeasurementsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<MeasurementReadDto>> GetMeasurements([FromQuery] QueryStringParameters queryStringParameters)
        {
            int skip = (queryStringParameters.Page - 1) * queryStringParameters.Limit;

            var measurements = _context.Measurements
                .OrderBy(x => x.Id)
                .Skip(skip)
                .Take(queryStringParameters.Limit);

            var measurementReadDto = _mapper.Map<IEnumerable<MeasurementReadDto>>(measurements);

            return Ok(measurementReadDto);
        }

        [HttpGet("{id}", Name = "GetMeasurementById")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<MeasurementReadDto> GetMeasurementById([FromRoute] int id)
        {
            var measurement = _context.Measurements.FirstOrDefault(l => l.Id == id);

            if (measurement == null) return NotFound();

            var measurementReadDto = _mapper.Map<MeasurementReadDto>(measurement);

            return Ok(measurementReadDto);
        }

        [HttpPost]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<MeasurementReadDto> CreateMeasurement([FromBody] MeasurementCreateDto measurementCreateDto)
        {
            var measurement = _mapper.Map<Measurement>(measurementCreateDto);
            _context.Measurements.Add(measurement);
            _context.SaveChanges();

            var measurementReadDto = _mapper.Map<MeasurementReadDto>(measurement);

            return CreatedAtRoute(
                nameof(GetMeasurementById),
                new { measurementReadDto.Id },
                measurementReadDto
            );
        }

        [HttpPut("{id}")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<MeasurementReadDto> UpdateMeasurement([FromRoute] int id, [FromBody] MeasurementUpdateDto measurementUpdateDto)
        {
            var measurement = _context.Measurements.FirstOrDefault(l => l.Id == id);

            if (measurement == null) return NotFound();

            _mapper.Map(measurementUpdateDto, measurement);
            _context.SaveChanges();

            var measurementReadDto = _mapper.Map<MeasurementReadDto>(measurement);

            return Ok(measurementReadDto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeleteMeasurement([FromRoute] int id)
        {
            var measurement = _context.Measurements.FirstOrDefault(l => l.Id == id);

            if (measurement == null) return NotFound();

            _context.Remove(measurement);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
