import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  user:any;
    constructor(public authService:AuthService,public router:Router){}
  
    ngOnInit(): void {
      this.authService.getUserProfile().subscribe({
        next:data=>{
          this.user=data;
          console.log("request user ",data)
        }
      })
    }
  
    handleLogout(){
      this.authService.logout()
    }
  }
