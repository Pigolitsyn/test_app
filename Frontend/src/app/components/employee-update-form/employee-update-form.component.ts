import {Component, Input, TemplateRef} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CrudService} from '../../services/employees/crud.service';
import { Employee } from "../../interfaces";
import { dateToString } from "../../helpers/dateToString";

@Component({
  selector: 'app-employee-update-form',
  templateUrl: './employee-update-form.component.html',
})
export class EmployeeUpdateFormComponent {
  @Input() employee!: Employee;


  employeeForm: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private modalService: NgbModal,
  ) {
  }

  updateForm() {
    this.employeeForm = this.formBuilder.group({
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
  }

  ngOnInit() {
    this.updateForm();
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', animation: true, backdrop: "static"}).result.then((result) => {
      if (result === 'ok') {
        this.onSubmit()
      }
    }, null);
  }

  onSubmit() {

    if (this.employeeForm.value.birthDate!.year) {
      this.employee.birthDate = dateToString(this.employeeForm.value.birthDate);
    }
    if (this.employeeForm.value.hireDate!.year) {
      this.employee.hireDate = dateToString(this.employeeForm.value.hireDate);
    }
    if (this.employeeForm.value.department) {
      this.employee.department = this.employeeForm.value.department
    }
    if (this.employeeForm.value.fullName) {
      this.employee.fullName = this.employeeForm.value.fullName
    }
    if (this.employeeForm.value.salary) {
      this.employee.salary = parseInt(this.employeeForm.value.salary)
    }

    this.crudService.updateEmployee(this.employee).subscribe({
      next: () => this.updateForm(), error: err => console.log(err)
    });
  }
}
