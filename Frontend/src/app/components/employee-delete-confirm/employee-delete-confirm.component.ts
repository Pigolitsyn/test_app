import { Component, Input, Output, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/interfaces/Employee';
import { CrudService } from 'src/app/services/employees/crud.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-employee-delete-confirm',
  templateUrl: './employee-delete-confirm.component.html',
})
export class EmployeeDeleteConfirmComponent {
  @Input() employee!: Employee;
  @Output() employeeDelete: EventEmitter<void> = new EventEmitter()

  constructor(private modalService: NgbModal, private crudService: CrudService) {}

  open(content: TemplateRef<any>) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result === 'ok') {
        this.deleteEmployee();
      }
    }, null);
  }

  deleteEmployee() {
    this.crudService.deleteEmployee(this.employee.id).subscribe({complete: () => {
      this.employeeDelete.emit();
    }}); 
  }
}
