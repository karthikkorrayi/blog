import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AddBlogComponent } from '../add-blog/add-blog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BlogCardComponent } from "../blog-card/blog-card.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [AddBlogComponent, MatIconModule, MatButtonModule, BlogCardComponent]
})
export class DashboardComponent {
  blog = [1, 1, 1, 1, 1, 1, 1];
  blogs = [];

  constructor(public dialog: MatDialog, private blogService: BlogService) {}

  blogItem = {
    title: 'Margherita Pizza',
    description:
      'A classic Italian pizza with simple yet flavorful ingredients.',
    image:
      'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: [
      'Pizza dough (1 ball)',
      'Tomato sauce (1/2 cup)',
      'Fresh mozzarella cheese (8 oz)',
      'Fresh basil leaves (A handful)',
      'Olive oil (1-2 tbsp)',
      'Salt (To taste)',
      'Black pepper (To taste)',
    ],
    user: {
      image:
        'https://images.pexels.com/photos/1009904/pexels-photo-1009904.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
  };

  openCreateBlogModel = () => {
    this.dialog.open(AddBlogComponent);
  };

  ngOnInit(): void {
    this.getBlogs();
    this.blogService.blogsSubject.subscribe((blogData) => {
      this.blogs = blogData.blogs;
    });
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (blogs: any) => {
        // this.blogs = blogs;
        console.log('blogs ', blogs);
      },
      error: (error: any) => {
        console.error('Error fetching blog:', error);
      },
    });
  }

  updateBlog(blog: any) {
    this.blogService.updateBlog(blog).subscribe({
      next: (updatedBlog: any) => {
        console.log('blog updated:', updatedBlog);
        // Update the respective blog in this.blogs if needed
      },
      error: (error: any) => {
        console.error('Error updating blog:', error);
      },
    });
  }

  deleteBlog(id: number) {
    console.log('delete success', id);
    this.blogService.deletedBlog(id).subscribe({
      next: (res) => {
        console.log('blog deleted:', res);
        // Remove the respective blog from this.blog if needed
      },
      error: (error: any) => {
        console.error('Error deleting blog:', error);
      },
    });
  }
}