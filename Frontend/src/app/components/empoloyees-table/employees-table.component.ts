import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {CrudService} from '../../services/employees/crud.service';
import {Employee} from "../../interfaces";
import {SortableDirective, SortEvent} from './sortable.directive';
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
})
export class EmployeesTableComponent implements OnInit {

  constructor(public crudService: CrudService) {
    this.form.valueChanges.subscribe(text => {
      this.Employees$.subscribe(employees => {
        this.Employees = employees.filter(
          employee => employee.fullName.toLowerCase().includes(text.fullName.toLowerCase())
          && employee.department.toLowerCase().includes(text.department.toLowerCase())
          && employee.salary >= text.salaryFrom && employee.salary <= text.salaryTo)
      })
    })
  }

  Employees$!: Observable<Employee[]>;
  Employees: Employee[] = [];
  MaxSalary: number = 1000000;

  form = new FormGroup({
    fullName: new FormControl(''),
    department: new FormControl(''),
    salaryFrom: new FormControl(''),
    salaryTo: new FormControl(this.MaxSalary),
  })

  @ViewChild('alertPlaceholder', { read: ViewContainerRef }) alertPlaceholder!: ViewContainerRef;
  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;


  ngOnInit(): void {
    this.updateEmployees();
  }

  updateEmployees(orderBy?: string, direction?: string) {
    this.Employees$ = this.crudService.getEmployees(orderBy, direction)
    this.Employees$.subscribe(employees => {
      this.Employees = employees;
      this.MaxSalary = Math.max(...employees.map(employee => employee.salary))
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




/*  createMessage() {
    const message = this.alertPlaceholder.createComponent(ErrorWasOccuredComponent,{});
    setTimeout(() => { message.destroy() }, 2000)
  }*/

}
