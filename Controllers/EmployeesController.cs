#nullable enable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
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
        private readonly ILogger<EmployeesController> _logger;
        private readonly EmployeesService _service;

        public EmployeesController(ILogger<EmployeesController> logger, EmployeesService service)
        {
            _service = service;
            _logger = logger;
        }

        [Route("[controller]/getAll/")]
        [HttpGet]
        public List<Employee> GetAll(string? orderBy, string? direction)
        {
            return _service.ReadAll(orderBy, direction);
        }

        [Route("[controller]/get/{id}")]
        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            _logger.Log(LogLevel.Information, "Endpoint: employees/get/id");
            try
            {
                var employee = await _service.ReadOne(id);
                return Ok(employee);
            }
            catch (NullReferenceException exception)
            {
                return NotFound();
            }
        }

        [HttpDelete]
        [Route("[controller]/deleteOlder")]
        public IActionResult DeleteOlderThan(int old)
        {
            try
            {
                _service.DeleteElderThan(old);
                return Ok();
            }
            catch
            {
                return NotFound();
            }
            
        }

        [Route("[controller]/create/")]
        [HttpPost]
        public async Task<IActionResult> Create(Employee employee)
        {
            _logger.Log(LogLevel.Information, "Endpoint: employees/create/");
            try
            {
                return Ok(await _service.Create(employee));
            }
            catch (ValidationException exception)
            {
                return ValidationProblem(exception.Message);
            }
        }

        [Route("[controller]/update/")]
        [HttpPut]
        public async Task<Employee> Update(Employee employee)
        {
            _logger.Log(LogLevel.Information, "Endpoint: employees/update/");
            return await _service.Update(employee);
        }

        [Route("[controller]/delete/")]
        [HttpPost]
        public string Delete(int id)
        {
            _logger.Log(LogLevel.Information, "Endpoint: employees/delete/");
            return _service.Delete(id);
        }

        [Route("[controller]/makeallhappy")]
        [HttpPost]
        public void MakeAllHappy()
        {
            _service.MakeAllHappy();
        }
    }
}