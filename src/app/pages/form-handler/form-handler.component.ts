import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MagicInputComponent } from '../../components/magic-input/magic-input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToasterComponent, ToastKind } from '../../components/toaster/toaster.component';

import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-form-handler',
  standalone: true,
  imports: [MagicInputComponent,ReactiveFormsModule,ToasterComponent],
  templateUrl: './form-handler.component.html',
  styleUrl: './form-handler.component.css'
})
export class FormHandlerComponent {

  @ViewChild(ToasterComponent) ToasterTools!:ToasterComponent;

  FormTypes=  {
    AgregarCuenta:"agregarCuenta",
    EditarCuenta:"editarCuenta",
    CambiarContrasena:"cambiarContraseña"
  }

  formData = new FormGroup({
    numero_cuenta: new FormControl(''),
    banco: new FormControl(''),
    new_password: new FormControl('')

  })

  Bancos:string[]=["Bank of America","Chase","Wells Fargo","Citibank","Capitalone","TD","USAA"]
 
  currentType:string="";
  constructor(private router:Router, private firebase_service:FirebaseService){
    if(Object.values(this.FormTypes).includes(this.router.parseUrl(router.url).queryParams['form'] as string)){
      this.currentType=this.router.parseUrl(router.url).queryParams['form'] as string;
    }else{
      console.error('Invalid Form Type')
    }

   }
  
   async handle_sumbit(event:Event):Promise<void>{
    event.preventDefault();
    switch(this.currentType){
      case this.FormTypes.AgregarCuenta:
        const num_cuenta = this.formData.controls.numero_cuenta.value;
        const banco = this.formData.controls.banco.value;
        if(num_cuenta!==null && banco!==null){
          //Aqui se debe areglar el codigo
          this.ToasterTools.setKind(ToastKind.success);
          this.ToasterTools.setMessage("Cuenta creada con exito");
          this.ToasterTools.showToast();
          setTimeout(()=>{this.router.navigate(["/Perfil"])},3000)
        }else{
          this.ToasterTools.setKind(ToastKind.error);
          this.ToasterTools.setMessage("Favor de llenar ambos campos");
          this.ToasterTools.showToast();
        }
        break;


      case this.FormTypes.EditarCuenta:
        const num_cuenta2 = this.formData.controls.numero_cuenta.value;
        const banco2 = this.formData.controls.banco.value;
        const uid=this.router.parseUrl(this.router.url).queryParams['uid'];
        if(num_cuenta2!==null && banco2!==null){
          this.editarCuenta(uid,Number(num_cuenta2),banco2);
          }else{
            this.ToasterTools.setKind(ToastKind.error);
            this.ToasterTools.setMessage("Favor de llenar ambos campos");
            this.ToasterTools.showToast();
          }
        break;


      case this.FormTypes.CambiarContrasena:

        const new_password = this.formData.controls.new_password.value;
        if(new_password!==null){
          try{
            await this.firebase_service.updatePassword(new_password)
            this.ToasterTools.setKind(ToastKind.success);
            this.ToasterTools.setMessage("Contraseña cambiada con exito");
            this.ToasterTools.showToast();
            setTimeout(()=>{this.router.navigate(["/"])},3000);
          }catch{
            this.ToasterTools.setKind(ToastKind.error);
            this.ToasterTools.setMessage("Error al cambiar la contraseña");
            this.ToasterTools.showToast();
          }
          
        }else{
            this.ToasterTools.setKind(ToastKind.error);
            this.ToasterTools.setMessage("Favor de llenar ambos campos");
            this.ToasterTools.showToast();
        }
        break;
    }
    
  }

  

  private editarCuenta(uid:string,number_cuenta:number,banco:string):void{

  }

  private cambiarContrasena(old_password:string,new_password:string){
    console.log("cambiar contraseña")
  }

  private get_values(form:HTMLFormElement){
    const values = new Map<string,string>();
    form.querySelectorAll("input").forEach((input:HTMLInputElement)=>{
      values.set(input.name,input.value);
    })

  }
  
}
