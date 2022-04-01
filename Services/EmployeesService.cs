#nullable enable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using test_app.Entities;

namespace test_app.Services
{
    public class EmployeesService
    {
        private readonly ApplicationContext _db;
        private readonly ILogger<EmployeesService> _logger;
        private readonly ValidationService _validationService;

        public EmployeesService(ApplicationContext db, ILogger<EmployeesService> logger,
            ValidationService validationService)
        {
            _db = db;
            _logger = logger;
            _validationService = validationService;
        }

        public async Task<Employee> Create(Employee employee)
        {
            if (_validationService.ValidateEmployee(employee) == false) throw new Exception("Validation error");
            var response = _db.Employees.AddAsync(employee).Result.Entity;
            await _db.SaveChangesAsync();
            _logger.Log(LogLevel.Information, $"user: {response} was created");
            return response;
        }

        public async Task<Employee> ReadOne(int id)
        {
            return await _db.Employees.FindAsync(id);
        }

        public List<Employee> ReadAll(string? orderBy)
        {
            return orderBy switch
            {
                "department" => _db.Employees.OrderBy(employee => employee.Department).ToList(),
                "fullname" => _db.Employees.OrderBy(employee => employee.FullName).ToList(),
                "salary" => _db.Employees.OrderBy(employee => employee.Salary).ToList(),
                "birthdate" => _db.Employees.OrderBy(employee => employee.BirthDate).ToList(),
                "hiredate" => _db.Employees.OrderBy(employee => employee.HireDate).ToList(),
                _ => _db.Employees.ToList()
            };
        }

        public async Task<Employee> Update(Employee newEmployee)
        {
            if (!_validationService.ValidateEmployee(newEmployee)) throw new Exception();
            Console.WriteLine(newEmployee);
            var employee = await _db.Employees.FindAsync(newEmployee.Id);
            employee.Department = newEmployee.Department;
            employee.Salary = newEmployee.Salary;
            employee.BirthDate = newEmployee.BirthDate;
            employee.FullName = newEmployee.FullName;
            employee.HireDate = newEmployee.HireDate;
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
                _logger.Log(LogLevel.Critical, error.Message);
                ;
                return "Not ok";
            }
        }
    }
}