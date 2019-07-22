import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from './services/user.service';
import {global} from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Blog de angular';

  public identity;
  public token;
  public url;

  constructor(
    private _userService: UserService
  ) {
    this.loadUser();
    this.url = global.url;
  }

  ngOnInit() {
    console.log('Webapp cargada correctamente!');
  }

  ngDoCheck(): void {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
