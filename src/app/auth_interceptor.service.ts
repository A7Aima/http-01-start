import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request on its way');
    const modifyRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz'),
    });
    return next.handle(modifyRequest).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log('Response arrived, body data: ');
          console.log(event.body);
        }
      })
    );
  }
}
