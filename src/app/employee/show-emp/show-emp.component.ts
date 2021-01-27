import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  EmployeeList:Employee[];
  ModalTitle:string;
  ActivateAddEditEmpComp:boolean=false;
  totalRecords: number;
  page:Number=1;
  dataSaved: boolean;
  employeeForm: any;
  employeeIdUpdate = null;
  message = null;

  constructor(private empService:EmployeeService,
              private employee: Employee,
              private router: Router) { }

  ngOnInit(): void {
    this.refreshEmpList();
  }

  editClick(id: number){
    this.router.navigate(['/Edit', id]);
  }

  deleteClick(item){
    if(confirm('Are you sure?')){
      this.empService.deleteEmployeeById(item.Id).subscribe(data=>{
        alert(item.Name + " Deleted");
        this.refreshEmpList();
      })
    }
  }

  refreshEmpList(){
    this.empService.getAllEmployee().subscribe(data=>{
    this.EmployeeList=data;
    this.totalRecords = data.length;
    });
  }
}
