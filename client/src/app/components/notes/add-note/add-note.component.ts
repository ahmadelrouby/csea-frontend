import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NotesService} from '../../../services/notes.service';
import { ActivatedRoute, Router } from '@angular/router';

function view(){
  console.log(this.fileInput);
}
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {


  form;
  processing = false;
  message;
  messageClass;
  file
  courses;

  constructor(private formBuilder: FormBuilder,private notesService: NotesService, private router: Router) {
    this.createNewNoteForm()
}

  // Enable new blog form
    enableFormNewNoteForm() {
      this.form.get('title').enable(); // Enable title field
      this.form.get('body').enable(); // Enable body field
      this.form.get('creator').enable(); // Enable body field
    }

    // Disable new blog form
    disableFormNewNoteForm() {
      this.form.get('title').disable(); // Disable title field
      this.form.get('body').disable(); // Disable body field
      this.form.get('creator').disable(); // Disable body field
    }

    onNoteSubmit(event){
      // console.log(this.form.get('fileUp'));
      this.processing = true;
      this.disableFormNewNoteForm();
      var nBlog = {
        title: this.form.controls.title.value,
        body: this.form.controls.body.value,
        creator: this.form.controls.creator.value,
        course: this.form.controls.courses.value,
        file: this.file
      };
      console.log(nBlog);
      this.notesService.submitFile(nBlog).subscribe(data=>{
        if (!data.success) {
            this.messageClass = 'alert alert-danger'; // Return error class
            this.message = data.message; // Return error message
            this.processing = false; // Enable submit button
            this.enableFormNewNoteForm(); // Enable form
          } else {
            this.messageClass = 'alert alert-success'; // Return success class
            this.message = data.message; // Return success message
            console.log(this.message)
            // Clear form data after two seconds
            setTimeout(() => {
              this.processing = false; // Enable submit button
              this.message = false; // Erase error/success message
              this.form.reset(); // Reset all form fields
              this.enableFormNewNoteForm(); // Enable the form fields
              this.router.navigate(['/notes']);
            }, 2000);
          }
      });
    }

    submitFile(fileInput: any){
      if (fileInput.target.files && fileInput.target.files[0]) {
        this.file = fileInput.target.files[0];
      }
    }
    createNewNoteForm(){
      this.form = this.formBuilder.group({
        title: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(5)
        ])] ,

        body: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(0),
        ])] ,

        creator: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(1),
        ])] ,
        courses: ''

      })
    }

  ngOnInit() {
    this.notesService.getCourses().subscribe(data=>{
      this.courses = data.courses;
      if(this.courses[0]){
        this.form.setValue({
          title: '',
          body: '',
          creator: '',
          courses: this.courses[0].code
        })
      }

    })
  }

}
