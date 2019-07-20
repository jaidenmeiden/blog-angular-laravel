import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {appRoutingProviders, routing} from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    HomeComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    routing, /*Importamos el modulo routing*/
    FormsModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders, /*Importamos el provider*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
