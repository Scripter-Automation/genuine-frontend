import { Component } from '@angular/core';
import { CuentaCardComponent } from '../../components/cuenta-card/cuenta-card.component';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';
import { DocumentData } from 'firebase/firestore';
import { Item, StorageService } from '../../../services/storage.service';
import { Profile } from '../../../types/global';
import { FormControl, FormsModule } from '@angular/forms';





@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CuentaCardComponent, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  cards:DocumentData[]=[];
  editar_nombre:boolean=false;
  editar_telefono:boolean=false;
  user_profile:Profile=  (this.storage_service.get("Profile")!["profile"] as unknown ) as Profile;
  nombre_usuario = this.user_profile.user_name
  correo = this.user_profile.email
  telefono = this.user_profile.telephone

  nombre_cambio = new FormControl(this.nombre_usuario)
  constructor(private router:Router, private firebase:FirebaseService, private storage_service:StorageService){
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
    if(this.editar_nombre){
      this.user_profile.user_name=this.nombre_usuario
      this.storage_service.delete("Profile")
      this.storage_service.store("Profile", {profile:this.user_profile, expiration:this.user_profile.expiration})
      this.firebase.update("users",this.user_profile.email,this.user_profile)
    }
    this.editar_nombre=!this.editar_nombre;
  }
  setEditarTelefono():void{
    if(this.editar_telefono){
      this.user_profile.telephone = this.telefono
      this.storage_service.delete("Profile")
      this.storage_service.store("Profile", {profile:this.user_profile, expiration:this.user_profile.expiration})
      this.firebase.update("users",this.user_profile.email,this.user_profile)
    }
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
