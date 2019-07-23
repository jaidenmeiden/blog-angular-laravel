import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {

  public pageTitle: string;
  public post: Post;
  public identity;
  public token;
  public status: string;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.pageTitle = 'Crear nueva entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.post = new Post(1, this.identity.sub, 0, '', '', '', '');
    console.log(this.post);
  }

}
