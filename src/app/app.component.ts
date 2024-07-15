import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MenuBarComponent],
  templateUrl: './app.component.html',
 
})
export class AppComponent {
  title = 'genuine';
  showMenuBar:boolean=false;

  constructor(private router:Router,private firebase_service:FirebaseService){
    this.router.events.subscribe((event) => {
      this.showMenuBar = this.router.url !== '/IniciarSession';
    }); 
  }
  
  
}
