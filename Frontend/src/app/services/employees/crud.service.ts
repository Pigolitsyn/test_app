import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Employee, EmployeeDto} from "../../interfaces/Employee";


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private httpClient: HttpClient) { }

  headersJson = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')

  endpoint = 'https://localhost:5001';
  

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.endpoint + "/employees/getall")
  }

  createEmployee(employee: EmployeeDto): Observable<Employee> {
    return this.httpClient.post<Employee>(this.endpoint + "/employees/create", 
    employee, { 'headers': this.headersJson })
  }

  updateEmployee(employee: Employee) {
    return this.httpClient.put<Employee>(this.endpoint + "/employees/update",
    employee, { "headers": this.headersJson })
  }


  deleteEmployee(id: number) {
    console.log(id)
    return this.httpClient.post(this.endpoint + "/employees/delete?id=" + id, null, {
      responseType: "text",
    });
  }
}
