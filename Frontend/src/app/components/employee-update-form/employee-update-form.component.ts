import {Component, Input, TemplateRef} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {CrudService} from '../../services/employees/crud.service';
import {Employee, EmployeeDto} from "../../interfaces/Employee";

export interface date {
  day: string,
  month: string,
  year: string
}

@Component({
  selector: 'app-employee-update-form',
  templateUrl: './employee-update-form.component.html',
})
export class EmployeeUpdateFormComponent {
  @Input() employee!: Employee;
  

  employeeForm: any = {};
  
  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      fullName: this.employee.fullName,
      salary: this.employee.salary,
      birthDate: {
        day: '',
        month: '',
        year: '',
      },
      hireDate: {
        day: '',
        month: '',
        year: '',
      },
      department: this.employee.department,
    })

  }

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private modalService: NgbModal,
  ) {
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result === 'ok') {
        this.onSubmit()
      }
    }, null);
  }

  onSubmit() {
    let employee: Employee = {
      id: this.employee.id,
      birthDate: `${this.employeeForm.value.birthDate.year}-${this.employeeForm.value.birthDate.month}-${this.employeeForm.value.birthDate.day}`,
      hireTime: `${this.employeeForm.value.hireDate.year}-${this.employeeForm.value.hireDate.month}-${this.employeeForm.value.hireDate.day}`,
      department: this.employeeForm.value.department,
      fullName: this.employeeForm.value.fullName,
      salary: parseInt(this.employeeForm.value.salary),
    }

    console.log(employee)
    this.crudService.updateEmployee(employee).subscribe({next: (empl: any) => {
      console.log(empl)
    }, error: err => console.log(err)});
    this.employeeForm.reset();
  }
}
