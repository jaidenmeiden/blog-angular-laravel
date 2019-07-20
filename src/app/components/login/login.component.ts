import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public identity: User;
  public token: string;
  public status: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.pageTitle = 'Login';
    this.user = new User(1, '', '', '', '', 'ROLE_USER', '', '', '', '', '');
  }

  ngOnInit() {
    this.logout();
  }

  onSubmit(form) {
    this._userService.signup(this.user).subscribe(
      response => {
        if(!response.status || response.status != 'error') {
          this.status = 'success';
          this.token = response;

          this._userService.signup(this.user, true).subscribe(
            response => {
              this.identity = response;

              console.log(this.identity);
              console.log(this.token);

              //localStorage.setItem('token', this.token);
              //localStorage.setItem('identity', JSON.stringify(this.identity));

              //this._router.navigate(['/inicio']);
            }, error => {
              this.status = 'error';
              console.error(error);
            }
          );
        } else {
          this.status = 'error';
        }
      }, error => {
        this.status = 'error';
        console.error(error);
      }
    );
  }

  logout() {
    this._route.params.subscribe(params => {
      let sure = params['sure'];

      if(sure == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        this._router.navigate(['/inicio']);
      }
    });
  }
}
