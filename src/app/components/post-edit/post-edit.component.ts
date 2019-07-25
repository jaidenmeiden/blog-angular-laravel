import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import {PostService} from '../../services/post.service';
import {Category} from '../../models/category';
import {Post} from '../../models/post';
import {global} from '../../services/global';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {

  public pageTitle: string;
  public post: Post;
  public identity;
  public token;
  public status: string;
  public categories: Array<Category>;
  public url;
  public froalaOptions: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .git, .jpeg",
    maxSize: "1",
    uploadAPI:  {
      url: global.url + 'api/post/upload',
      headers: {
        "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Subir imagen de la entrada',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService,
    private _router: Router,
    private _route: ActivatedRoute,
    private cdRef:ChangeDetectorRef
  ) {
    this.pageTitle = 'Editar entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit() {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 0, '', '', '', '');
    this.getPost();
    /*
    * El siguiente método captura la excepción:
    *
    * ERROR Error: "ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'ngForOf: undefined'. Current value: 'ngForOf: [object Object],[object Object],[object Object],[object Object],[object Object]'."
    *
    * Dicha excepción aparece cuando se le s asignado un valor a un campo y luego es modificado.
    * */
    this.cdRef.detectChanges();
  }

  getCategories() {
    this._categoryService.getCategories(this.token).subscribe(
      response => {
        if(response.status == 'success') {
          this.categories = response.categories;
        }
      }, error => {
        console.error(<any>error);
      }
    );
  }

  getPost() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._postService.getPost(id).subscribe(
        response => {
          if(response.status == 'success') {
            this.post= response.post;

            if(this.post.user_id != this.identity.sub) {
              this._router.navigate(['/inicio']);
            }

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

  onSubmit(form) {
    this._postService.update(this.token, this.post).subscribe(
      response => {
        if(response && response.status == 'success') {
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/detalle-entrada', this.post.id]);
        } else {
          this.status = 'error';
        }
      }, error => {
        this.status = 'error';
        console.error(error);
      }
    );
  }

  imagenUpload(datos){
    let data = JSON.parse(datos.response);
    this.post.image = data.image;
  }

  imageExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return (http.status !== 404);
  }

}
