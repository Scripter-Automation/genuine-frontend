import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, getAuth, signOut, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { Item, StorageService, TimeFrame } from './storage.service';
import { ExpiringCredential, QueryParams } from '../types/global';
import { collection, doc, DocumentData, query,getDocs, where, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { BackendService } from './backend.service';
import { Router } from '@angular/router';
import type { User } from 'firebase/auth';



@Injectable({
  providedIn: 'root',
})
/**
 * @class FirebaseService
 * 
 * @classdesc It's purpose is to controll basic firebase instructions such as log in, logout, check is there is a user persisted. 
 *  Aditionally it has controll over the database and has consumable functions for the services that extend this class.
 * Some of those controlls are querying, updating, creating and deleting. Providing crud functionallity wrapers to the multistep
 * porcesses required by firebase
 * @private @property  {FirebaseApp} this.app The aplication instance created by initializeApp
 * @protected @property  {Firestore} this.db The firestore database instance of the aplication
 * @private @property  {Auth} this.auth The auth instance of the aplication
 * @protected @deprecated @property {UserCredential | undefined} this.userCredential The user credential stored in local storage -->!important!<-- (Should be changed to a httpcookie)!!!
 */
export class FirebaseService {
  private app: FirebaseApp;
  protected db: Firestore;
  private auth: Auth;
  private user?:User|Item;


  constructor(public storage_service: StorageService,private backend_service:BackendService, private router:Router) {
    this.app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);
    this.user = this.storage_service.get("Profile") as Item
    console.log(this.user)
    this.stateChange();

  }

  public async stateChange() {
    await new Promise((resolve) => {
        this.auth.onAuthStateChanged((user) => {
            this.user = user as User;
            console.log(this.user)
            resolve(null);
        });
    });

}

 

  /**
   * @this Login 
  */
  public async Login(email: string, password: string): Promise<void> {
    const userCredential =(await signInWithEmailAndPassword(this.auth, email, password)) as ExpiringCredential;
    const response = await this.backend_service.create_session(await userCredential.user.getIdToken());
    this.stateChange()

  }

  public get_user_uid(){
    if(this.haveUser()){
      return this.user
    }else{
      return null
    }
  }


  public haveUser(): boolean {
    return (this.user !== null && this.user!==undefined)
  }

  
  public logout(){
    this.storage_service.delete("Profile")
    signOut(this.auth)
    this.user=undefined;
    this.router.navigate(["/"])

  }
  /**
   * @method query A method to get the values of a collection via a query
   * @param {String} collection_name The name of the collection you want to query
   * @param {QueryParams} query_params The parameters that the firebase query function should recive
   * @returns Null if there was an error otherwise you will recive an array of DocumentData
   */
  public async query(collection_name:string,query_params:QueryParams):Promise<null|undefined|DocumentData[]>{
    if(this.haveUser()){
      try{
        const my_collection = collection(this.db,collection_name);
        const querySnapshot = await getDocs(query(my_collection,where(query_params.identifier, query_params.operation, query_params.value)));
        
        if(!querySnapshot.empty){
          return querySnapshot.docs;
        }else{
          console.error("FirebaseService Error: No such documents!");
          return null;
        }
      }catch(error){
        console.error(error);
        return null;
      }
      
    }
    console.error("FirebaseService Error: No user in service instance");
    return null;
  }




  /**
   * @method update Updates the value of a document where the match path contains a wildcard to identify via uid
   * @param collection_name The collection to be recive the update
   * @param uid The unique Id required by the wildcard
   * @param data The data to replace the original data
   */
  public async update(collection_name:string,uid:string,data:DocumentData){
    if(this.haveUser()){
      try{
        const my_collection = collection(this.db,collection_name);
        const docRef = doc(my_collection,uid);
        updateDoc(docRef,data);
      }catch (error){
        console.error(error);
      }
    }
  }

  /**
 * @method create Creates a new document in a collection
 * @param collection_name The collection to receive the new document
 * @param data The data for the new document
 */
  public async create(collection_name: string, data: DocumentData) {
    if (this.haveUser()) {
      try {
        const my_collection = collection(this.db, collection_name);
        await addDoc(my_collection, data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**
 * @method delete Deletes a document from a collection
 * @param collection_name The collection to delete the document from
 * @param doc_id The ID of the document to delete
 */
public async delete(collection_name: string, doc_id: string) {
  if (this.haveUser()) {
    try {
      const docRef = doc(this.db, collection_name, doc_id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(error);
    }
  }
}

public async updatePassword(new_password:string){
  if(this.haveUser()){
    try{
      const user = this.auth.currentUser;
      await updatePassword(user!,new_password)
      this.logout();
    }catch(error){
      throw error;
    }
  }
}

}
