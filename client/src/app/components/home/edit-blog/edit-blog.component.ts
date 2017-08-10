import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {BlogService} from '../../../services/blog.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  form;
  id;
  found = false;
  done = false;
  processing = false;
  message;
  messageClass;
  constructor(  private location: Location,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private blogService: BlogService,
              private router: Router) {
                this.createNewBlogForm();
              }

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params;
    this.blogService.findBlog(this.id.id).subscribe(data=>{
      console.log(data);
      this.done = true;
      if(!data.success){
        this.found = false;
      }else{
        this.form.setValue({
          title: data.blog.title,
          body: data.blog.body,
          creator: data.blog.createdBy
        })
        // this.form['title'].value = data.blog.title;
        // this.form.find('title').value = data.blog.title;
        // this.form.find('body').value = data.blog.body;
        // this.form.find('creator').value = data.blog.creator;
        this.found = true;
      }
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


  onBlogSubmit(){
    this.processing = true;
    this.disableFormNewBlogForm();
    var nBlog = {
      id: this.id.id,
      title: this.form.controls.title.value,
      body: this.form.controls.body.value,
      creator: this.form.controls.creator.value
    };

    console.log(nBlog);
    this.blogService.editBlog(nBlog).subscribe(data =>{
      console.log(data);
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
            this.processing = false; // Enable submit button
            this.message = false; // Erase error/success message
            this.form.reset(); // Reset all form fields
            this.enableFormNewBlogForm(); // Enable the form fields
            this.router.navigate(['/home']);
          }, 2000);
        }
    })

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
}
