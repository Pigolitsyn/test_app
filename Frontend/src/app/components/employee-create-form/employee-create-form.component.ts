import {Component, EventEmitter, Output, TemplateRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {CrudService} from '../../services/employees/crud.service';
import {EmployeeDto} from "../../interfaces";

@Component({
  selector: 'app-employee-create-form',
  templateUrl: './employee-create-form.component.html',
})
export class EmployeeCreateFormComponent {
  @Output() userCreated: EventEmitter<void> = new EventEmitter;

  employeeForm = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
    ]),
    department: new FormControl('', [
      Validators.required,
    ]),
    salary: new FormControl('', [
      Validators.required,
    ]),
    birthDate: new FormControl({
      day: '',
      month: '',
      year: '',
    }, [
      Validators.required,
    ]),
    hireDate: new FormControl({
      day: '',
      month: '',
      year: '',
    }, [
      Validators.required,
    ])
  })

  constructor(
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
    console.log(this.employeeForm.status)
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

  get fullName() { return this.employeeForm.get('fullName'); }
  get department() { return this.employeeForm.get('department'); }
  get salary() { return this.employeeForm.get('salary') }
}
