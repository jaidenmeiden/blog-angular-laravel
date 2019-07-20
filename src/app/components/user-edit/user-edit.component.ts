import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public status: string;
  public identity;
  public token;

  constructor(
    private _userService: UserService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.pageTitle = 'Ajustes de usuario';
    this.user = new User(this.identity.sub, this.identity.name, this.identity.surname, this.identity.email, '', 'ROLE_USER', '', '', '', '', '');
  }

  ngOnInit() {
  }

  onSubmit(form) {

  }

}
