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

    this.storage_service.store("Profile",await response.json() as Item)

  }
}
