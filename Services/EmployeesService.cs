#nullable enable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;

using test_app.Entities;

namespace test_app.Services 
{
    public class EmployeesService
    {
        private readonly ApplicationContext _db;
        private readonly ILogger<EmployeesService> _logger;
        private readonly ValidationService _validationService;

        public EmployeesService(ApplicationContext db, ILogger<EmployeesService> logger, ValidationService validationService) {
            _db = db;
            _logger = logger;
            _validationService = validationService;
        }
        
        public async Task<Employee> Create(Employee employee)
        {
            if (_validationService.ValidateEmployeeDto(employee))
            {
                var response = _db.Employees.AddAsync(employee).Result.Entity;
                await _db.SaveChangesAsync();
                _logger.Log(LogLevel.Information, $"user: {response} was created");
                return response;
            }

            throw new Exception();
        }
        
        public async Task<Employee> ReadOne(int id)
        {
            return await _db.Employees.FindAsync(id);
        }

        public List<Employee> ReadAll(string? orderBy) => orderBy switch
        {
            "department" => _db.Employees.OrderBy(employee => employee.Department).ToList(),
            "fullname" => _db.Employees.OrderBy(employee => employee.FullName).ToList(),
            "salary" => _db.Employees.OrderBy(employee => employee.Salary).ToList(),
            "birthdate" => _db.Employees.OrderBy(employee => employee.HireTime).ToList(),
            "hiredate" => _db.Employees.OrderBy(employee => employee.HireTime).ToList(),
            _ => _db.Employees.ToList()
        };

        public async Task<Employee> Update(Employee newEmployee)
        {
            var employee = await _db.Employees.FindAsync(newEmployee.Id);
            employee.Department = newEmployee.Department;
            employee.Salary = newEmployee.Salary;
            employee.BirthDate = newEmployee.BirthDate;
            employee.FullName = employee.FullName;
            employee.HireTime = employee.HireTime;
            await _db.SaveChangesAsync();
            return employee;
        }

        public string Delete(int id)
        {
            try
            {
                var employee = new Employee {Id = id};
                _db.Employees.Attach(employee);
                _db.Employees.Remove(employee);
                _db.SaveChanges();
                return "Ok";
            }
            catch (Exception error)
            {
                _logger.Log(LogLevel.Critical, error.Message); ;
                return "Not ok";
            }
        }
    }
}