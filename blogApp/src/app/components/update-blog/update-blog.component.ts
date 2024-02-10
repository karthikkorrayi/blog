import { Component, Inject } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-blog',
  standalone: true,
  imports: [
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,],
  templateUrl: './update-blog.component.html',
  styleUrl: './update-blog.component.css'
})
export class UpdateBlogComponent {
  blogItem: any = {
    title: '',
    description: '',
    foodType: '',
    image: '',
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private blogService: BlogService) {
    this.blogItem=data
  }

  handleUpdateBlog() {
    console.log('Form submitted:', this.blogItem);
    this.blogService.updateBlog(this.blogItem).subscribe({
      next:(res)=>console.log("res",res),
      error:(error)=>console.log("error ",error)
    });
  }

  
}
