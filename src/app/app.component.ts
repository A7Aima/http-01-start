import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Post } from './post.model';
import { NgForm } from '@angular/forms';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  @ViewChild("postForm") form: NgForm;
  isFetching = false;

  constructor(private http: HttpClient, private postService: PostService) { }

  ngOnInit() {
    this.onFetchPosts();
  }

  url: string = 'https://http-angular-test-c4fd2-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content, this.url);
    this.form.reset();
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPost(this.url)
      .subscribe(body => {
        this.isFetching = false;
        this.loadedPosts = body;
      });
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePost(this.url).subscribe(() => {
      this.loadedPosts = [];
    });
  }

}
