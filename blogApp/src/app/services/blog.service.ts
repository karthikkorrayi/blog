import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogsSubject = new BehaviorSubject<any>({
    blogs: [],
    loading: false,
    newBlog: null,
  });

  private apiUrl = 'http://kk.itcblogs.xyz';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
  getBlogs(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/api/blog`, { headers }).pipe(
      tap((blogs) => {
        const currentState = this.blogsSubject.value;
        this.blogsSubject.next({ ...currentState, blogs });
      })
    );
  }

  createBlog(blog: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .post<any>(`${this.apiUrl}/api/blog`, blog, { headers })
      .pipe(
        tap((newBlog) => {
          const currentState = this.blogsSubject.value;
          this.blogsSubject.next({
            ...currentState,
            blogs: [newBlog, ...currentState.blogs],
          });
        })
      );
  }

  updateBlog(blog: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put<any>(`${this.apiUrl}/api/blog/${blog.id}`, blog, { headers })
      .pipe(
        tap((updatedBlog) => {
          const currentState = this.blogsSubject.value;
          const updatedBlogs = currentState.blogs.map((item: any) =>
            item.id === updatedBlog.id ? updatedBlog : item
          );
          this.blogsSubject.next({
            ...currentState,
            blogs: updatedBlogs,
          });
        })
      );
  }

  likeBlog(blogId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put<any>(`${this.apiUrl}/api/blog/${blogId}/like`, {}, { headers })
      .pipe(
        tap((updatedBlog) => {
          const currentState = this.blogsSubject.value;
          const updatedBlogs = currentState.blogs.map((item: any) =>
            item.id === updatedBlog.id ? updatedBlog : item
          );
          this.blogsSubject.next({
            ...currentState,
            blogs: updatedBlogs,
          });
        })
      );
  }

  deletedBlog(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/api/blog/${id}`, {
      headers,
    }).pipe(
      tap((deletedBlog)=>{
        const currentState=this.blogsSubject.value;
        const updatedBlogs=currentState.blogs.filter((item:any)=>item.id!==id)
        this.blogsSubject.next({...currentState,blogs:updatedBlogs})
      })
    );
  }
}