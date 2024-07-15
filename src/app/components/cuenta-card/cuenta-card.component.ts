import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cuenta-card',
  standalone: true,
  imports: [],
  templateUrl: './cuenta-card.component.html',
  styleUrl: './cuenta-card.component.css'
})
export class CuentaCardComponent {
  constructor(private router:Router){}
  //cuenta debe de ser un input
  uid="1234567890"

  FormTypes=  {
    EditarCuenta:"editarCuenta",
  }

  getForm(form:string){
    if(Object.values(this.FormTypes).includes(form)){
      console.log("here")
      this.router.navigate(["/Formulario"],{queryParams:{form:form,uid:this.uid}})
    }else{
      console.error('El formulario que intentas acceder no existe')
    }
  }
}
