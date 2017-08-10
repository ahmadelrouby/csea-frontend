import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';


import {BlogService} from './services/blog.service';
import {NotesService} from './services/notes.service';
import { EditBlogComponent } from './components/home/edit-blog/edit-blog.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { AboutComponent } from './components/about/about.component';
import { NotesComponent } from './components/notes/notes.component';
import { AddNoteComponent } from './components/notes/add-note/add-note.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EditBlogComponent,
    AnnouncementsComponent,
    AboutComponent,
    NotesComponent,
    AddNoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [BlogService,FormBuilder,NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
