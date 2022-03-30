#nullable enable
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using test_app.Entities;
using test_app.Services;

namespace test_app.Controllers
{
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeesService _service;
        private readonly ILogger<EmployeesController> _logger;

        public EmployeesController(ILogger<EmployeesController> logger, EmployeesService service)
        {
            _service = service;
            _logger = logger;
        }

        [Route("[controller]/getAll/")]
        [HttpGet]
        public List<Employee> GetAll(string? orderBy)
        {
            return _service.ReadAll(orderBy);
        }

        [Route("[controller]/get/{id}")]
        [HttpGet]
        public async Task<Employee> Get(int id)
        {
            _logger.Log(LogLevel.Information, "Endpoint: employees/get/id");
            return await _service.ReadOne(id);
        }

        [Route("[controller]/create/")]
        [HttpPost]
        public async Task<Employee> Create(Employee employee)
        {
            _logger.Log(LogLevel.Information, "Endpoint: employees/create/");
            return await _service.Create(employee);
        }

        [Route("[controller]/update/")]
        [HttpPut]
        public async Task<Employee> Update(Employee employee)
        {
            _logger.Log(LogLevel.Information, "Endpoint: employees/create/");
            return await _service.Update(employee);
        }

        [Route("[controller]/delete/")]
        [HttpPost]
        public string Delete(int id)
        {
            _logger.Log(LogLevel.Information, "Endpoint: employees/delete/");
            return _service.Delete(id);
        }
    }
}
