using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.VisualBasic;

namespace test_app.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
        [Required]
        public DateTime HireDate { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Department { get; set; }
        [Required]
        public uint Salary { get; set; }
    }
}