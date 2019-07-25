import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() posts;
  @Input() identity;
  @Input() url;

  @Output() eliminar = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  deletePost(id) {
    this.eliminar.emit(id);
  }
}
