import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Post } from "./post.model";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class PostService {

    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string, url: string) {
        const postData: Post = { title: title, content: content };
        console.log(postData);
        this.http.post<{ name: string }>(url, postData).subscribe(responseData => {
            console.log(responseData);
        });
    }

    fetchPost(url: string) {
        // this request is sending the observable but doesn't get called until it get subscribed
        return this.http.get<{ [key: string]: Post }>(url)
            .pipe(map(responseData => {
                const postArray: Post[] = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        postArray.push({ ...responseData[key], id: key });
                    }
                }
                return postArray;
            }));
    }

    deletePost(url: string) {
        return this.http.delete(url);
    }
}