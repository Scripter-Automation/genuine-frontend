import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Item, StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private storage_service:StorageService) { }

  async create_session(myToken:string){
    
    const response = await fetch(environment.Back_end.url+environment.Back_end.paths.create_session,{
      method:"POST",
      headers: {
        "Authorization":`Bearer ${myToken}`
      }
    })
    let res = await response.json()
    console.log(res)
    this.storage_service.store("Profile",res as Item)

  }
}
