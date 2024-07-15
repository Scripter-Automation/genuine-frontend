import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { OportunidadesComponent } from './pages/oportunidades/oportunidades.component';
import { InversionesComponent } from './pages/inversiones/inversiones.component';
import { ContratosComponent } from './pages/contratos/contratos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { FormHandlerComponent } from './pages/form-handler/form-handler.component';
import { RetirosComponent } from './pages/retiros/retiros.component';
import { authGuard, sessionGuard } from './auth.guard';

export const routes: Routes = [
    {path:'', redirectTo:"/IniciarSession",pathMatch:'full'},
    {path:'IniciarSession',component:LoginComponent,canActivate:[sessionGuard]},
    {path:'Oportunidades',component:OportunidadesComponent, canActivate:[authGuard]},
    {path:"Inversiones", component:InversionesComponent, canActivate:[authGuard]},
    {path:"Contratos", component:ContratosComponent, canActivate:[authGuard]},
    {path:"Perfil", component:PerfilComponent, canActivate:[authGuard]},
    {path:"Formulario",component:FormHandlerComponent, canActivate:[authGuard]},
    {path:"Retiros",component:RetirosComponent, canActivate:[authGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }