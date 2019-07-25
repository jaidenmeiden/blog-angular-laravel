import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {global} from './global';

/*
Configurar la clase.
Se utiliza el decorador @Injectable para poder injectar el servicio y no crear una instancia cada vez que se requiera
*/
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public identity;
  public token;

  constructor(
    public _http: HttpClient /*Cuando se coloca un guión bajo en una propiedad de angular se determina que el final es un servicio*/
  ) {
    this.url = global.url;
  }

  prueba() {
    return 'Hola mundo';
  }

  register(user):Observable<any> {
    let json = JSON.stringify(user);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url + '/api/user/register', params, {headers: headers});
  }

  signup(user, gettoken = null):Observable<any> {
    if(gettoken != null) {
      user.gettoken = 'true';
    }
    let json = JSON.stringify(user);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url + '/api/user/login', params, {headers: headers});
  }

  update(token, user):Observable<any> {
    //Limpiar campo content (Editor de texto enriquecido) htmlEntities > utf8
    user.description = global.htmlEntities(user.description);
    let json = JSON.stringify(user);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + 'api/user/update', params, {headers: headers});
  }

  getUser(id):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'api/user/detail/' + id, {headers: headers});
  }

  getPosts(id):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'api/post/user/' + id, {headers: headers});
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity && identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token && token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }

}
