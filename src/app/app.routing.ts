/*Importamos las librerias necesarias*/
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

/*Importamos lo componentes*/
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {ErrorComponent} from './components/error/error.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {CategoryNewComponent} from './components/category-new/category-new.component';
import {PostNewComponent} from './components/post-new/post-new.component';
import {PostDetailComponent} from './components/post-detail/post-detail.component';
import {PostEditComponent} from './components/post-edit/post-edit.component';
import {CategoryDetailComponent} from './components/category-detail/category-detail.component';

/*Creamos el path para cada uno de los componentes*/
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout/:sure', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'ajustes', component: UserEditComponent},
  {path: 'crear-categoria', component: CategoryNewComponent},
  {path: 'detalle-categoria/:id', component: CategoryDetailComponent},
  {path: 'crear-entrada', component: PostNewComponent},
  {path: 'detalle-entrada/:id', component: PostDetailComponent},
  {path: 'editar-entrada/:id', component: PostEditComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', component: ErrorComponent}
];

/*Exportamos la configuración*/
export const appRoutingProviders: any[] = [];
/*Cargamos toda la configuración de rutas que hemos creado*/
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);


