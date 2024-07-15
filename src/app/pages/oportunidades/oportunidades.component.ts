import { Component, OnInit } from '@angular/core';
import { UserDataHeaderComponent } from '../../components/user-data-header/user-data-header.component';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';

import { StorageService } from '../../../services/storage.service';
import { Profile } from '../../../types/global';
import { FirebaseService } from '../../../services/firebase.service';


@Component({
  selector: 'app-oportunidades',
  standalone: true,
  imports: [UserDataHeaderComponent,PropertyCardComponent],
  templateUrl: './oportunidades.component.html',
  styleUrl: './oportunidades.component.css'
})
export class OportunidadesComponent implements OnInit {
  cards = [1,2,3,4]

  constructor(private storage_service:StorageService,private firebase_service:FirebaseService){}

  ngOnInit(): void {
    const user_profile = (this.storage_service.get("user_profile") as unknown ) as Profile;
    let user_name:string|undefined,telephone:number|undefined;
    if(user_profile.user_name===undefined){
      user_name = prompt("Ingrese su Nombre de Usuario") as string
      user_profile.user_name=user_name;
    }
    if(user_profile.telephone===undefined){
      telephone = Number(prompt("Ingrese su Telefono") as string)
      user_profile.telephone=telephone;
    }

    if(user_name!==undefined || telephone!==undefined){
      
      
      this.storage_service.store("user_profile",user_profile)
    }
    
  }


}
