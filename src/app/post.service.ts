import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string, url: string) {
    const postData: Post = { title: title, content: content };
    console.log(postData);
    this.http.post<{ name: string }>(url, postData).subscribe(
      (responseData) => {
        console.log(responseData);
      },
      (error) => {
        this.error.next(error.message);
      }
    );
  }

  fetchPost(url: string) {
    // this request is sending the observable but doesn't get called until it get subscribed
    return this.http
      .get<{ [key: string]: Post }>(url, {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello', // for test
        }),
      })
      .pipe(
        map((responseData) => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }

  deletePost(url: string) {
    return this.http.delete(url);
  }
}
