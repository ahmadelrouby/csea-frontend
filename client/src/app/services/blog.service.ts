import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class BlogService {


  backend_domain = "http://localhost:8080/";
  constructor(private http: Http) { }

  getAllBlogs(){
    console.log(this.backend_domain);
    var url = this.backend_domain + 'blogs/allBlogs';
    return this.http.get(url).map(data => data.json());

  }

  getAllBlogsTotal(){
    var url = this.backend_domain + 'blogs/allBlogsTotal';
    return this.http.get(url).map(data => data.json());

  }

  postBlog(blog){
    var url = this.backend_domain + 'blogs/addBlog';
    return this.http.post(url,blog).map(data => data.json());
  }

  deleteBlog(blog_id){
    var url = this.backend_domain + 'blogs/deleteBlog/' + blog_id;
    return this.http.post(url,{}).map(data => data.json());
  }

  findBlog(blog_id){
    var url = this.backend_domain + 'blogs/find/' + blog_id;
    return this.http.get(url).map(data=>data.json());
  }

  editBlog(blog){
    var url = this.backend_domain + 'blogs/editBlog';
    return this.http.post(url,blog).map(data => data.json());
  }
}
