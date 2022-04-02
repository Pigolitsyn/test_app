import {Component } from '@angular/core';
import {CrudService} from "../../services/employees/crud.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  deleteOlder() {
    this.service.deleteOlder().subscribe(() => { alert("И что ты наделал?") })
  }

  makeAllHappy() {
    this.service.makeAllHappy().subscribe(() => { alert("Наконец-то индексация") })
  }

  constructor(public service: CrudService) {
  }

}
