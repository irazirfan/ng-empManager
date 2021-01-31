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
  checks = false;

  constructor(private empService:EmployeeService,
              private employee: Employee,
              private router: Router) { }

  ngOnInit(): void {
    this.empService.refreshNeeded$
    .subscribe(() => {
      this.refreshEmpList();
    });
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.empService.getAllEmployee().subscribe(data=>{
    this.EmployeeList=data;
    this.totalRecords = data.length;
    });
  }

  addEmployee(){
    this.router.navigate(['/AddEmployee']);
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

  deleteEmployees(){
    const selectedEmployees = this.EmployeeList.filter(employee => employee.Checked).map(p => p.Id);
    if(selectedEmployees && selectedEmployees.length > 0){
      if(confirm('Are you sure?')){
        this.empService.deleteEmployees(selectedEmployees).subscribe(data=>{
          alert("Records Deleted");
          this.refreshEmpList();
        })
      }
    }
    else{
      alert('No rows selected');
    }
  }

  checkAllCheckBox(ev) {
		this.EmployeeList.forEach(x => x.Checked = ev.target.Checked)
	}

	isAllCheckBoxChecked() {
		return this.EmployeeList.every(p => p.Checked);
	}

}
