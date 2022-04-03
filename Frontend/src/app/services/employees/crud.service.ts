import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee, EmployeeDto} from "../../interfaces/Employee";


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  headersJson = new HttpHeaders()
    .set('content-type', 'application/json')
  endpoint = 'https://localhost:5001';

  constructor(private httpClient: HttpClient) {
  }

  getEmployees(orderBy?: string, direction?: string): Observable<Employee[]> {
    let url = this.endpoint + "/employees/getall";

    url += orderBy ? `?orderBy=${orderBy.toLowerCase()}` : '';
    url += direction ? `&direction=${direction}` : '';
    console.log(url)
    return this.httpClient.get<Employee[]>(url)
  }

  createEmployee(employee: EmployeeDto): Observable<Employee> {
    return this.httpClient.post<Employee>(this.endpoint + "/employees/create",
      employee)
  }

  updateEmployee(employee: Employee) {
    return this.httpClient.put<Employee>(this.endpoint + "/employees/update",
      employee)
  }


  deleteEmployee(id: number) {
    console.log(id)
    return this.httpClient.post(this.endpoint + "/employees/delete?id=" + id, null, {
      responseType: "text",
    });
  }

  deleteOlder() {
    return this.httpClient.delete(this.endpoint + "/employees/deleteOlder?old=70", )
  }

  makeAllHappy() {
    return this.httpClient.post(this.endpoint + "/employees/makeallhappy", null, )
  }
}
