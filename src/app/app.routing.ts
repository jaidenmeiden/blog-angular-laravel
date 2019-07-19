/*Importamos las librerias necesarias*/
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

/*Importamos lo componentes*/
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

/*Creamos el path para cada uno de los componentes*/
const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'inicio', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout/:sure', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
];

/*Exportamos la configuración*/
export const appRoutingProviders: any[] = [];
/*Cargamos toda la configuración de rutas que hemos creado*/
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);


