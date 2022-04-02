import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import {HeaderComponent} from './components/header/header.component';
import {AppComponent} from './app.component';
import {EmployeesTableComponent} from './components/empoloyees-table/employees-table.component';
import {HomeComponent} from './components/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeCreateFormComponent} from './components/employee-create-form/employee-create-form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SortableDirective} from './components/empoloyees-table/sortable.directive';
import {EmployeeDeleteConfirmComponent} from './components/employee-delete-confirm/employee-delete-confirm.component';
import {EmployeeUpdateFormComponent} from './components/employee-update-form/employee-update-form.component';
import { ErrorWasOccuredComponent } from './components/alerts/error-was-occured/error-was-occured.component';
import { SearchFormComponent } from './components/search-form/search-form.component';


const routes: Routes = [
  {path: "employees", component: EmployeesTableComponent},
  {path: "home", component: HomeComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeesTableComponent,
    HomeComponent,
    EmployeeCreateFormComponent,
    EmployeeDeleteConfirmComponent,
    EmployeeUpdateFormComponent,
    SortableDirective,
    ErrorWasOccuredComponent,
    SearchFormComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {
}
