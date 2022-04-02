import {
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {CrudService} from '../../services/employees/crud.service';
import {Employee} from "../../interfaces";
import {SortableDirective, SortEvent} from './sortable.directive';
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
})
export class EmployeesTableComponent  {

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;
  form = new FormGroup({
    fullName: new FormControl(''),
    department: new FormControl(''),
    salaryFrom: new FormControl(''),
    salaryTo: new FormControl(100000000),
  })
  Employees$!: Observable<Employee[]>;
  Employees: Employee[] = [];


  constructor(public crudService: CrudService) {
    this.updateEmployees();
    // filtration search form
    this.form.valueChanges.subscribe(text => {
      this.Employees$.subscribe(employees => {
        this.Employees = employees.filter(
          employee => employee.fullName.toLowerCase().includes(text.fullName.toLowerCase())
            && employee.department.toLowerCase().includes(text.department.toLowerCase())
            && employee.salary >= text.salaryFrom && employee.salary <= text.salaryTo)
      })
    })
  }

  updateEmployees(orderBy?: string, direction?: string) {
    this.Employees$ = this.crudService.getEmployees(orderBy, direction)
    this.Employees$.subscribe(employees => {
      this.Employees = employees;
    })
  }

  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    })
    if (direction !== '' && column !== '') {
      this.updateEmployees(column, direction);
    } else {
      this.updateEmployees();
    }
  }

  print(date: NgbDate[]) {
    console.log(date)
  }
}
