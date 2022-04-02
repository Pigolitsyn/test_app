import {Component, EventEmitter, Output, TemplateRef} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {CrudService} from '../../services/employees/crud.service';
import {EmployeeDto} from "../../interfaces";

@Component({
  selector: 'app-employee-create-form',
  templateUrl: './employee-create-form.component.html',
})
export class EmployeeCreateFormComponent {
  @Output() userCreated: EventEmitter<void> = new EventEmitter;

  employeeForm = this.formBuilder.group({
    fullName: '',
    salary: '',
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
    department: '',
  })

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private modalService: NgbModal,
  ) {
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', animation: true, backdrop: "static"}).result.then((result) => {
      if (result === 'ok') {
        this.onSubmit()
      }
    }, null);
  }


  onSubmit() {
    let employee: EmployeeDto = {
      birthDate: new Date(this.employeeForm.value.birthDate.year, this.employeeForm.value.birthDate.month - 1, this.employeeForm.value.birthDate.day),
      hireDate: new Date(this.employeeForm.value.hireDate.year, this.employeeForm.value.birthDate.month - 1, this.employeeForm.value.hireDate.day),
      department: this.employeeForm.value.department,
      fullName: this.employeeForm.value.fullName,
      salary: parseInt(this.employeeForm.value.salary),
    }
    console.log(employee)
    this.crudService.createEmployee(employee).subscribe({next: (empl: any) => {
      console.log(empl)
      this.userCreated.emit();
    }, error: err => console.log(err)});
    this.employeeForm.reset();
  }
}
