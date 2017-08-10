import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { AboutComponent } from './components/about/about.component';
import { NotesComponent } from './components/notes/notes.component';
import { AddNoteComponent } from './components/notes/add-note/add-note.component';
import {EditBlogComponent} from './components/home/edit-blog/edit-blog.component';


const appRoutes: Routes = [
{
  path: '',
  component: HomeComponent
},{
  path: 'home',
  component: HomeComponent
},{
  path: 'edit-blog/:id',
  component: EditBlogComponent
},{
  path: 'announcements',
  component: AnnouncementsComponent
},{
  path: 'notes',
  component: NotesComponent
},{
  path: 'about',
  component: AboutComponent
},{
  path: 'add-note',
  component: AddNoteComponent
}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]

})
export class AppRoutingModule {}
