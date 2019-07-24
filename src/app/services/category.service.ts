import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {global} from './global';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public url: string;

  constructor(
    public _http: HttpClient /*Cuando se coloca un guión bajo en una propiedad de angular se determina que el final es un servicio*/
  ) {
    this.url = global.url;
  }

  store(token, category):Observable<any> {
    let json = JSON.stringify(category);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + 'api/category', params, {headers: headers});
  }

  getCategories(token):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'api/category', {headers: headers});
  }
}
