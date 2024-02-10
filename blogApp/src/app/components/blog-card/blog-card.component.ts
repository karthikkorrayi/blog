import { Component, Input } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBlogComponent } from '../update-blog/update-blog.component';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatIconModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent {

  @Input() blog:any;
  user:any
  // @Input() handleDeleteBlog:any
  

  constructor(public dialog: MatDialog,public blogService:BlogService,public authService:AuthService) {}

  ngOnInit(){
    this.authService.authSubject.subscribe((auth)=>{
      this.user=auth.user
    })
  }
  // openDialog() {
  //   console.log("open dialog ------------")
  //   this.dialog.open(SharedModelComponent);
  // }
  openUpdateBlogModel = () => {
    this.dialog.open(UpdateBlogComponent,{data:this.blog});
  };
  deleteBlog(id: number) {
    console.log("delete success",id)
    this.blogService.deletedBlog(id)
      .subscribe(
        {next:(res) => {
          console.log('blog deleted:', res);
          // Remove the respective v from this.blogs if needed
        },
        error:(error: any) => {
          console.error('Error deleting blog:', error);
        }}
      );
  }

  handleBlogLike(id:number){
    
    this.blogService.likeBlog(id).subscribe({
      next:data=>console.log("like --",data),
      error:error=>console.log("error --- ",error)
    })
  }
  
}
