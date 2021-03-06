import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/post';
import {global} from './global';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public url: string;

  constructor(
    public _http: HttpClient /*Cuando se coloca un guión bajo en una propiedad de angular se determina que el final es un servicio*/
  ) {
    this.url = global.url;
  }

  store(token, post):Observable<any> {
    //Limpiar campo content (Editor de texto enriquecido) htmlEntities > utf8
    post.content = global.htmlEntities(post.content);
    let json = JSON.stringify(post);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + '/api/post', params, {headers: headers});
  }

  update(token, post):Observable<any> {
    //Limpiar campo content (Editor de texto enriquecido) htmlEntities > utf8
    post.content = global.htmlEntities(post.content);
    let json = JSON.stringify(post);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + '/api/post/' + post.id, params, {headers: headers});
  }

  getPosts():Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'api/post', {headers: headers});
  }

  getPost(id):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'api/post/' + id, {headers: headers});
  }

  delete(token, id):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.delete(this.url + 'api/post/' + id, {headers: headers});
  }
}
