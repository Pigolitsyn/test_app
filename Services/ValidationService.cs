using test_app.Entities;

namespace test_app.Services
{
    public class ValidationService
    {
        public bool ValidateEmployee(Employee employee)
        {
            var countOfWords = employee.FullName.Split(" ").Length;
            if (employee.Department == "" || countOfWords != 3) return false;
            return true;
        }
    }
}