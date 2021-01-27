import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';
import { AddEditEmpComponent } from '../add-edit-emp/add-edit-emp.component';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  EmployeeList:Employee[];
  ModalTitle:string;
  ActivateAddEditEmpComp:boolean=false;
  totalRecords: Number;
  page:Number=1;

  constructor(private empService:EmployeeService, private employee: Employee) { }

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(){
    this.employee.Name = "";
    this.employee.Email = "";
    this.employee.Address = "";
    this.employee.Phone = "";
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;

  }

  editClick(item){
    console.log(item);
    this.employee=item;
    this.ModalTitle="Edit Employee";
    this.ActivateAddEditEmpComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure??')){
      this.empService.deleteEmployeeById(item.Id).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.empService.getAllEmployee().subscribe(data=>{
      this.EmployeeList=data;
      this.totalRecords = data.length;
    });
  }
}
