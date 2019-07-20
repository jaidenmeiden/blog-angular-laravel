import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public pageTitle: string;
  public user: User;

  constructor(
    private _userService: UserService
  ) {
    this.pageTitle = 'Registro';
    this.user = new User(1, '', '', '', '', 'ROLE_USER', '', '', '', '', '');
  }

  ngOnInit() {
    console.log(this._userService.prueba());
  }

  onSubmit(form) {
    console.log(this.user);
    form.reset();
  }
}
