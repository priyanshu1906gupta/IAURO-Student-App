import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {
  registerForm: FormGroup | any;

  isEditMode = false; // Track whether the form is in edit mode

  @Output() studentAdded = new EventEmitter<any>();
  @Output() studentEdited = new EventEmitter<any>();

  constructor( private fb: FormBuilder){}

  ngOnInit(){
    this.registerForm = this.fb.group({
      id:[Math.floor(Math.random()*1000000)],
      name: ['', [Validators.required]],
      gender:['',[Validators.required]],
      course:['',[Validators.required]],
      acceptTerms:[false,[Validators.required]],
    })
  }

  onSubmit() {
    if(this.registerForm.invalid){
      return;
    }
    if(!this.registerForm.value.acceptTerms){
      alert('You must accept the terms and conditions to proceed.');
      return;
    }
    if (this.isEditMode) {
      this.studentEdited.emit(this.registerForm.value); // Emit edited student data
      this.isEditMode = false; // Switch back to add mode after editing
    } else {
      this.studentAdded.emit({ ...this.registerForm.value }); // Emit new student data
    }
    this.resetForm(); // Clear the form after submission
  }

  populateForm(student: any) {
    this.registerForm.patchValue(student);
    this.isEditMode = true; // Set the form to edit mode
  }

  resetForm() {
    this.registerForm.reset()
  }
}