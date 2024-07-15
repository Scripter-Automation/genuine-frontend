import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-bar',
  standalone: true,
  imports: [],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {

  constructor(private router:Router){}

  getOportunidades(){
    this.router.navigate(["/Oportunidades"])
  }

  getContratos(){
    this.router.navigate(["/Contratos"])
  }

  getInversiones(){
    this.router.navigate(["/Inversiones"])
  }

  getPerfil(){
    this.router.navigate(["/Perfil"])
  }
}
