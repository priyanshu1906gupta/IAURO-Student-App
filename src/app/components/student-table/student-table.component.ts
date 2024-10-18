import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.css'
})
export class StudentTableComponent {
  displayedColumns: string[] = ['name', 'gender', 'course', 'actions'];
  @Input() students:any[] = [];
  dataSource:any[] = [];
  @Output() edit = new EventEmitter<any>();

  ngDoCheck() {
    this.dataSource = [...this.students]; // Update the data source with the input students array
  }

  editStudent(student: any) {
    this.edit.emit(student); // Emit event for editing the student
  }

  deleteStudent(student: any) {
    const index = this.students.indexOf(student);
    if (index > -1) {
      this.students.splice(index, 1); // Remove student from the list
    }
  }
}
