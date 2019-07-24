import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/post';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {global} from '../../services/global';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, PostService]
})
export class HomeComponent implements OnInit {

  public pageTitle: string;
  public token;
  public url;
  public posts: Array<Post>;

  constructor(
    private _userService: UserService,
    private _postService: PostService
  ) {
    this.pageTitle = 'Inicio';
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this._postService.getPosts(this.token).subscribe(
      response => {
        if(response.status == 'success') {
          this.posts = response.posts;
        }
      }, error => {
        console.error(<any>error);
      }
    );
  }

  imageExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
  }
}
