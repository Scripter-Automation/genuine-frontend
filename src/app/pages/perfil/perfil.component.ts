import { Component } from '@angular/core';
import { CuentaCardComponent } from '../../components/cuenta-card/cuenta-card.component';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';
import { DocumentData } from 'firebase/firestore';
import { Item } from '../../../services/storage.service';





@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CuentaCardComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  cards:DocumentData[]=[];
  editar_nombre:boolean=false;
  editar_telefono:boolean=false;
  constructor(private router:Router, private firebase:FirebaseService){
    this.setCards()
  }

  private async setCards(){
    
  }

  FormTypes=  {
    AgregarCuenta:"agregarCuenta",
    EditarCuenta:"editarCuenta",
    CambiarContrasena:"cambiarContraseña"
  }

  setEditarNombre():void{
    this.editar_nombre=!this.editar_nombre;
  }
  setEditarTelefono():void{
    this.editar_telefono=!this.editar_telefono;
  }

  getForm(form:string,uid?:string):void{
    if(Object.values(this.FormTypes).includes(form)){
      this.router.navigate(["/Formulario"],{queryParams:{form:form,uid:uid}})
    }else{
      console.error('El formulario que intentas acceder no existe')
    }
  }

  getRetiros():void{
    this.router.navigate(["/Retiros"]);
  }

  logout():void{
    this.firebase.logout();
    this.router.navigate(["/"])
  }

}
