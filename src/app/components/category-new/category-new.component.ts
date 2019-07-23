import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {

  public pageTitle: string;
  public category: Category;
  public identity;
  public token;
  public status: string;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.pageTitle = 'Crear nueva categoría';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1, '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._categoryService.store(this.token, this.category).subscribe(
      response => {
        if(!response.status || response.status != 'error') {
          this.status = 'success';
          this.category = response.category;
          this._router.navigate(['/inicio']);
        } else {
          this.status = 'error';
        }
      }, error => {
        this.status = 'error';
        console.error(<any>error);
      }
    );
  }

}
