import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { Post } from './post.model';
import { NgForm } from '@angular/forms';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  @ViewChild('postForm') form: NgForm;
  isFetching = false;
  error = null;
  private errorListner: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnDestroy(): void {
    this.errorListner.unsubscribe();
  }

  ngOnInit() {
    this.errorListner = this.postService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });
    this.onFetchPosts();
  }

  url: string =
    'https://http-angular-test-c4fd2-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';
  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(
      postData.title,
      postData.content,
      this.url
    );
    this.form.reset();
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPost(this.url).subscribe(
      (body) => {
        this.isFetching = false;
        this.loadedPosts = body;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePost(this.url).subscribe(() => {
      this.loadedPosts = [];
    });
  }
  onHandleError() {
    this.error = null;
  }
}
