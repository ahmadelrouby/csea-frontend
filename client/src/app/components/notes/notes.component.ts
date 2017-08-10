import { Component, OnInit } from '@angular/core';
import {NotesService} from '../../services/notes.service';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  courses = [];
  notes = [];
  form;
  empty = false;
  constructor(private notesService: NotesService,
            private formBuilder: FormBuilder,) {
              this.createCourseForm();
            }

  get_notes(){
    this.notesService.getNotes(this.form.get('courses').value).subscribe(data =>{
      console.log(data);
      if(data.success){

        this.notes = data.notes;

        if(this.notes.length)
          this.empty = false;
        else
          this.empty = true;
      }else{

        //handle errors

      }
    })
  }

  downloadNote(note_id){
    window.open(this.notesService.getDownloadUrl(note_id),'_blank');
    // this.notesService.downloadNotes(note_id).subscribe((data) =>{
    //   let blob: Blob = data.blob();
    //  window['saveAs'](blob, 'test.pdf');
    // })
  }

  createCourseForm(){
      this.form = this.formBuilder.group({
        courses : ''
      });
  }
  ngOnInit() {
    this.notesService.getCourses().subscribe(data=>{
      this.courses = data.courses;
      if(this.courses[0]){
        this.form.setValue({
          courses: this.courses[0].code
        })
      }
      this.get_notes();

    })
  }

}
