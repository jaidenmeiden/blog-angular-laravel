import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {appRoutingProviders, routing} from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    routing, /*Importamos el modulo routing*/
  ],
  providers: [
    appRoutingProviders, /*Importamos el provider*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
