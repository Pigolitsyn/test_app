import {Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CrudService } from '../../services/employees/crud.service';
import { Employee } from "../../interfaces/Employee";
import { SortableDirective, SortEvent } from './sortable.directive';


const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
})
export class EmployeesTableComponent implements OnInit {

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(public crudService: CrudService) {}
  Employees: Employee[] = [];

  ngOnInit(): void {
      this.updateEmpolyees();
  }

  updateEmpolyees() {
    return this.crudService.getEmployees().subscribe((res) => {
      console.log(res)
      this.Employees = res;
    })
  }

  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    })

    if (direction === '' || column === '') {
      
    } else {
      this.Employees = [...this.Employees].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      })
    }
  }

  employees = this.Employees

  
}
