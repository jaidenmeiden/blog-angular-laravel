import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Category} from '../../models/category';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import {PostService} from '../../services/post.service';
import {global} from '../../services/global';
import {Post} from '../../models/post';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class CategoryDetailComponent implements OnInit {

  public url;
  public identity;
  public token;
  public category: Category;
  public posts: Array<Post>;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit() {
    this.getPostsByCategory();
  }

  getPostsByCategory() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._categoryService.getCategory(id).subscribe(
        response => {
          if(response.status == 'success') {
            this.category = response.category;
            this._categoryService.getPosts(id).subscribe(
              response => {
                if(response.status == 'success') {
                  this.posts = response.posts;
                } else {
                  this._router.navigate(['/inicio']);
                }
              }, error => {
                console.error(<any>error);
                this._router.navigate(['/inicio']);
              }
            );
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

  deletePost(id) {
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPostsByCategory();
      }, error => {
        console.error(<any>error);
      }
    );
  }
}
