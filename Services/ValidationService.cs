using test_app.Entities;

namespace test_app.Services
{
    public class ValidationService
    {
        public bool ValidateEmployee(Employee employee)
        {
            var countOfWords = employee.FullName.Split(" ").Length;
            if (employee.BirthDate == "" || employee.Department == "" || countOfWords != 3 ||
                employee.HireDate == "") return false;
            return true;
        }
    }
}