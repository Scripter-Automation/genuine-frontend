import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, UrlTree, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  

    if (typeof window !== 'undefined' && localStorage !== undefined) {
      const firebaseService = inject(FirebaseService);
      firebaseService.stateChange();
      const router = inject(Router);
      if(firebaseService.haveUser()){
        return true;
      }else{
        return router.parseUrl('/');
      }
    }
 return false;
};

export const sessionGuard: CanActivateFn = (routes:ActivatedRouteSnapshot, state:RouterStateSnapshot)=>{
  if (typeof window !== 'undefined' && localStorage !== undefined) {
  const firebaseService = inject(FirebaseService);
  const router = inject(Router);
  if(!firebaseService.haveUser()){
    return true;
  }else{
    return router.parseUrl('/Oportunidades');
  }
  }
 return true;
}

