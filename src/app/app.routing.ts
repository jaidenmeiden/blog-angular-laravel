/*Importamos las librerias necesarias*/
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

/*Importamos lo componentes*/
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {ErrorComponent} from './components/error/error.component';

/*Creamos el path para cada uno de los componentes*/
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout/:sure', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', component: ErrorComponent}
];

/*Exportamos la configuración*/
export const appRoutingProviders: any[] = [];
/*Cargamos toda la configuración de rutas que hemos creado*/
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);


