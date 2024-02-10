import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from "./components/auth/auth/auth.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, AuthComponent, NavigationComponent]
})
export class AppComponent implements OnInit{
  title = 'blogApp';
  user:any;

  constructor(public authService:AuthService){}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next:data=>console.log("user ---- ",data),
      error:error=>console.log("error",error)
    })
    this.authService.authSubject.subscribe(
      (auth)=>{
        console.log("auth ------- ",auth)
        this.user=auth.user
      }
    )
  }
}