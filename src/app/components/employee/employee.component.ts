import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms'
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees()
  }

  resetForm(form: NgForm){
    form.reset()
  }
 
  getEmployees(){
    this.employeeService.getEmployees().subscribe(
      res => {
        this.employeeService.employees = res;
      },
      err => console.log(err)
    )
  }

  addEmployee(form: NgForm){
    if(form.value._id){
      this.employeeService.updateEmployee(form.value).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      )
      form.reset()
      this.getEmployees();
    } else {
      this.employeeService.createEmployee(form.value).subscribe(
        (res) => {
          console.log(res)
          this.getEmployees()
          form.reset()
        },
        (err) => console.log(err)
      )
    }
  }

  deleteEmployee(_id:undefined){
    if(confirm('Are you sure you want to delete it')){
      this.employeeService.deleteEmployee(_id).subscribe(
      (res) => {
        this.getEmployees()
        console.log(res)
      },
      (err) => console.log(err)
      )
    }
  }

  updateEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee;
  }

}
