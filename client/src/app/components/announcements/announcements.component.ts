import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {BlogService} from '../../services/blog.service';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  blogs = [];
  deleters;
  form;
  newPost = false;
  processing;
  message;
  messageClass;
  constructor(private formBuilder: FormBuilder,
              private blogService: BlogService) {

            this.createNewBlogForm();
        }

    createNewBlogForm(){
      this.form = this.formBuilder.group({
        title: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5)
        ])] ,

        body: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(500),
          Validators.minLength(5),
        ])] ,

        creator: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5),
        ])] ,

      })
    }

    // Enable new blog form
  enableFormNewBlogForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('body').enable(); // Enable body field
    this.form.get('creator').enable(); // Enable body field
  }

  // Disable new blog form
  disableFormNewBlogForm() {
    this.form.get('title').disable(); // Disable title field
    this.form.get('body').disable(); // Disable body field
    this.form.get('creator').disable(); // Disable body field
  }

    newBlogForm(){
    this.newPost = true;
  }


  goBack(){
    this.newPost = false;
  }

  onBlogSubmit(){
    this.processing = true;
    this.disableFormNewBlogForm();
    var nBlog = {
      title: this.form.controls.title.value,
      body: this.form.controls.body.value,
      createdBy: this.form.controls.creator.value
    };

    this.blogService.postBlog(nBlog).subscribe(data =>{
      if (!data.success) {
          this.messageClass = 'alert alert-danger'; // Return error class
          this.message = data.message; // Return error message
          this.processing = false; // Enable submit button
          this.enableFormNewBlogForm(); // Enable form
        } else {
          this.messageClass = 'alert alert-success'; // Return success class
          this.message = data.message; // Return success message
          console.log(this.message)
          // Clear form data after two seconds
          setTimeout(() => {
            this.getAll();
            this.newPost = false; // Hide form
            this.processing = false; // Enable submit button
            this.message = false; // Erase error/success message
            this.form.reset(); // Reset all form fields
            this.enableFormNewBlogForm(); // Enable the form fields
          }, 3000);
        }
    })

  }

  finsih_all(){
    console.log("Finsihed");
  }
  getModalId(id){
    return "#modal"+id;
  }
  editBlog(id){
    console.log("Edit: " + id);
    confirm("Edit: " + id);
  }

  deleteBlog(id,idx){
    this.blogService.deleteBlog(id).subscribe(data =>{
      if(data.success){
        this.getAll();
      }else{
        console.log("Can't Delete");
      }
    })
  }
  allowDelete(idx){
    this.deleters[idx] = true;
  }

  disAllowDelete(idx){
    this.deleters[idx] = false;
  }

  editUrl (id){
    var x = "/edit-blog/" + id;
    console.log(x);
    return x;
  }
  getAll(){
    this.blogService.getAllBlogsTotal().subscribe(data =>{
      this.blogs = data;

      this.deleters = [];
      for(var i = 0; i < this.blogs.length; i++){
        this.deleters.push(false);
      }
    })
  }
  ngOnInit() {
    this.getAll();

  }

}
