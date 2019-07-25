import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Post} from '../../models/post';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {global} from '../../services/global';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [UserService, PostService]
})
export class PostDetailComponent implements OnInit {

  public pageTitle: string;
  public identity;
  public token;
  public url;
  public post: Post;

  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.pageTitle = 'Inicio';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._postService.getPost(id).subscribe(
        response => {
          if(response.status == 'success') {
            this.post= response.post;
          } else {
            this._router.navigate(['/inicio']);
          }
        }, error => {
          console.error(<any>error);
          this._router.navigate(['/inicio']);
        }
      );
    });
  }

  imageExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return (http.status !== 404);
  }

}
