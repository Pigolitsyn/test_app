export interface Employee extends EmployeeDto {
  id: number,
}

export interface EmployeeDto {
  department: string,
  fullName: string,
  birthDate: string,
  hireDate: string,
  salary: number,
}
