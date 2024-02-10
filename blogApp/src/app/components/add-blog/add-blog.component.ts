import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent {
  blogItem: any = {
    title: '',
    description: '',
    foodType: '',
    image: '',
  };

  constructor(private blogService:BlogService){}

  onSubmit() {
    // Handle form submission logic here (e.g., sending data to server)
    console.log('Form submitted:', this.blogItem);
    this.createBlog(this.blogItem)
    
    // You can perform API calls or any other operations here
  }

  createBlog(blog: any): void {
    this.blogService.createBlog(blog)
      .subscribe(
        {next:(newBlog: any) => {
          console.log('blog created:', newBlog);
          this.blogService.createBlog;
        },
        error:(error: any) => {
          console.error('Error creating blog:', error);
        }}
      );
  }
}