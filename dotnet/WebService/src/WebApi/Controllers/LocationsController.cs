using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.Dtos;

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
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<LocationReadDto>> GetAll(int page = 1, int limit = 10)
        {
            page = page < 1 ? 1 : page;
            limit = (limit < 1) || (limit > 1000) ? 10 : limit;
            int skip = (page - 1) * limit;

            var locations = _context.Locations
                .OrderBy(x => x.Id)
                .Skip(skip)
                .Take(limit);

            var locationReadDto = _mapper.Map<IEnumerable<LocationReadDto>>(locations);

            return Ok(locationReadDto);
        }
    }
}
