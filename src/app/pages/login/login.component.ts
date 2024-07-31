import { Component } from '@angular/core';
import { MagicInputComponent } from '../../components/magic-input/magic-input.component';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';
import { ToasterComponent, ToastKind } from '../../components/toaster/toaster.component';
import { ViewChild } from '@angular/core';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MagicInputComponent,ReactiveFormsModule,ToasterComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  @ViewChild(ToasterComponent) ToasterTools!:ToasterComponent;


  constructor(private router:Router, private auth:FirebaseService, private storage_service:StorageService){}

  async onSubmit(){
    let username = this.loginForm.get("username")!.value as string;
    let password = this.loginForm.get("password")!.value as string;
    try{
      await this.auth.Login(username,password);
      this.ToasterTools.setKind(ToastKind.success);
      this.ToasterTools.setTitle("Inicio de Session exitoso");
      this.ToasterTools.setMessage("");
      this.ToasterTools.showToast();
      this.router.navigate(["/Oportunidades"]);

    }catch(error){
      this.ToasterTools.setKind(ToastKind.error);
      this.ToasterTools.setTitle("Error");
      this.ToasterTools.setMessage("Usuario o contraseña incorrectos");
      this.ToasterTools.showToast();
      console.error(error);

    }
  }
  

}
