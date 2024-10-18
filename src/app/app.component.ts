import { Component, ViewChild } from '@angular/core';
import { StudentFormComponent } from './components/student-form/student-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  students:any = [];
  @ViewChild(StudentFormComponent) studentFormComponent!: StudentFormComponent;

  addStudent(student: any) {
    if(this.students.some((element: any) => element.id === student.id)){
      student.id++;
    }
    this.students.push(student); // Add new student to the list
  }

  updateStudent(updatedStudent: any) {
    
    const index = this.students.findIndex((s:any) => s.id === updatedStudent.id);
    if (index > -1) {
      this.students[index] = updatedStudent; // Update the existing student in the list
    }
  }

  editStudent(student: any) {
    this.studentFormComponent.populateForm(student); // Populate the form with student details for editing
  }
}