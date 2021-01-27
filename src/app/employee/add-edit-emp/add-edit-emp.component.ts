import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Employee } from 'src/app/employee';
import {EmployeeService} from 'src/app/employee.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private empService:EmployeeService, private formBuilder: FormBuilder) { }

  dataSaved: boolean;
  employeeForm: any;
  employeeIdUpdate = null;
  message = null;

  ngOnInit(): void {
  }

  onFormSubmit(){
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.createEmployee(employee);
    this.employeeForm.reset();
    };

  loadEmployeeToEdit(id: number){
    this.empService.getEmployeeById(id).subscribe(employee=> {
    this.message = null;
    this.dataSaved = false;
    this.employeeIdUpdate = employee.Id;
    this.employeeForm.controls['Name'].setValue(employee.Name);
    this.employeeForm.controls['Email'].setValue(employee.Email);
    this.employeeForm.controls['Address'].setValue(employee.Address);
    this.employeeForm.controls['Phone'].setValue(employee.Phone);
    });
  };

  createEmployee(employee: Employee) {
    if(this.employeeIdUpdate == null) {
      this.empService.createEmployee(employee).subscribe(
        () => {
          this.dataSaved = true;
          this.message = "Record Saved Succesfully;";
          this.employeeIdUpdate = null;
          this.employeeForm.reset();
        }
      );
    } else {
      employee.Id = this.employeeIdUpdate;
      this.empService.updateEmployee(employee).subscribe(() => {
          this.dataSaved = true;
          this.message = "Record updated Succesfully;";
          this.employeeIdUpdate = null;
          this.employeeForm.reset();
      });
    }
  }
}
