import { Component, OnInit } from '@angular/core';
import { UserDataHeaderComponent } from '../../components/user-data-header/user-data-header.component';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';



@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [UserDataHeaderComponent],
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.css'
})
export class ContratosComponent implements OnInit {

  constructor(private router:Router){}

  async ngOnInit(): Promise<void> {
    const code:string|undefined = this.router.parseUrl(this.router.url).queryParams['code']
    if(code){
      const res =await fetch(environment.Back_end.url+environment.Back_end.paths.access_token+"?code="+code,{
        method: 'GET',
        credentials:'include'
      })
      console.log(res)
      const embed_url= await res.json()
      console.log("url", embed_url)

      this.router.navigate(["/Signing"],{
        queryParams:{
          docusign_url:embed_url.url
        }
      })



    }
  }
  cards = [1,2,3,4]
  
  makeEnvelope(){

  }
    
  signContract(){
    window.location.href=environment.Docusing_Auth_URL  
  }
}
