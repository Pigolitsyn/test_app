using System;
using test_app.Entities;

namespace test_app.Services
{
    public class ValidationService
    {
        public bool ValidateEmployeeDto(Employee employee)
        {
            var countOfWords = employee.FullName.Split(" ").Length;
            if (employee.BirthDate == "" || employee.Department == "" || countOfWords != 3 || employee.HireTime == "")
            {
                return false;
            }
            return true;
        }
    }
}