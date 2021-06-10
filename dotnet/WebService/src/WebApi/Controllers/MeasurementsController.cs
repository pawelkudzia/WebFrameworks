using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.Dtos;
using WebApi.Models;
using WebApi.Utils;

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
        [Produces(MediaTypeNames.Application.Json)]
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
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<MeasurementReadDto> GetMeasurementById([FromRoute] int id)
        {
            var measurement = _context.Measurements.FirstOrDefault(m => m.Id == id);

            if (measurement == null) return NotFound();

            var measurementReadDto = _mapper.Map<MeasurementReadDto>(measurement);

            return Ok(measurementReadDto);
        }

        [HttpPost]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<MeasurementReadDto> CreateMeasurement([FromBody] MeasurementCreateDto measurementCreateDto)
        {
            var measurement = _mapper.Map<Measurement>(measurementCreateDto);
            _context.Measurements.Add(measurement);
            _context.SaveChanges();

            var measurementReadDto = _mapper.Map<MeasurementReadDto>(measurement);

            return CreatedAtRoute(nameof(GetMeasurementById), new { measurementReadDto.Id }, measurementReadDto);
        }

        [HttpPut("{id}")]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<MeasurementReadDto> UpdateMeasurement([FromRoute] int id, [FromBody] MeasurementUpdateDto measurementUpdateDto)
        {
            var measurement = _context.Measurements.FirstOrDefault(m => m.Id == id);

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
            var measurement = _context.Measurements.FirstOrDefault(m => m.Id == id);

            if (measurement == null) return NotFound();

            _context.Remove(measurement);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpGet("random")]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<MeasurementReadDto> GetRandomMeasurement()
        {
            int randomId = Randomizer.GetNumber(1, 10001);

            var measurement = _context.Measurements.FirstOrDefault(m => m.Id == randomId);

            if (measurement == null) return NotFound();

            var measurementReadDto = _mapper.Map<MeasurementReadDto>(measurement);

            return Ok(measurementReadDto);
        }

        [HttpGet("queries")]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<MeasurementReadDto>> GetMeasurementsByMultipleQueries([FromQuery] int count = 1)
        {
            count = (count < 1) || (count > 100) ? 1 : count;

            var measurements = new List<Measurement>();

            while (count > 0)
            {
                int randomId = Randomizer.GetNumber(1, 10001);
                var measurement = _context.Measurements.FirstOrDefault(m => m.Id == randomId);
                measurements.Add(measurement);
                count--;
            }

            measurements = measurements.OrderBy(m => m.Id).ToList();

            var measurementsReadDto = _mapper.Map<IEnumerable<MeasurementReadDto>>(measurements);

            return Ok(measurementsReadDto);
        }
    }
}
