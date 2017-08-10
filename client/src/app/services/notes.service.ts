import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NotesService {

  backend_domain = "http://localhost:8080/";
  constructor(private http: Http) { }


  getCourses(){
    var url = this.backend_domain + 'notes/courses';
    return this.http.get(url).map(data => data.json());
  }
  getNotes(course){
    var url = this.backend_domain + 'notes/courseNotes/'+ course;
    return this.http.get(url).map(data => data.json());
  }

  getDownloadUrl(note_id){
    return this.backend_domain + 'notes/downloadNotes/'+ note_id;
  }
  downloadNotes(note_id){
    var url = this.backend_domain + 'notes/downloadNotes/'+ note_id;
    return this.http.get(url);
  }
  submitFile(data){
      var url = this.backend_domain + 'notes-admin/newNote';
      let input = new FormData();
      input.append('file',data.file);
      // input.append('note', data);
      input.append('title',data.title);
      input.append('body',data.body);
      input.append('creator',data.creator);
      input.append('course',data.course);
      console.log(input);
      return this.http.post(url,input).map(data => data.json());
  }
}
