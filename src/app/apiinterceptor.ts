
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable()
export class Apiinterceptor implements HttpInterceptor {
  

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

       //const baseUrl = "http://172.104.61.150:7050";
        const baseUrl = "http://localhost:";
        const apiReq = req.clone({ url: `${baseUrl}${req.url}` });
        return next.handle(apiReq);
    }
    }