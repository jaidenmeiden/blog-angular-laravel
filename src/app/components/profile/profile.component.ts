import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {Post} from '../../models/post';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {global} from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, PostService]
})
export class ProfileComponent implements OnInit {

  public identity;
  public token;
  public url;
  public user: User;
  public posts: Array<Post>;

  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getUser(id);
      this.getPosts(id);
    });
  }

  getUser(userId) {
      this._userService.getUser(userId).subscribe(
        response => {
          if(response.status == 'success') {
            this.user = response.user;
          }
        }, error => {
          console.error(<any>error);
        }
      );
  }

  getPosts(userId) {
      this._userService.getPosts(userId).subscribe(
        response => {
          if(response.status == 'success') {
            this.posts = response.posts;
          }
        }, error => {
          console.error(<any>error);
        }
      );
  }

  deletePost(id) {
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getProfile();
      }, error => {
        console.error(<any>error);
      }
    );
  }

}
