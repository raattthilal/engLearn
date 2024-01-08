
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable()
export class Apiinterceptor implements HttpInterceptor {
  

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //    const baseUrl = "http://13.233.161.93:";
        const baseUrl = "http://65.1.247.168:";
        // const baseUrl = "http://localhost:";
        const apiReq = req.clone({ url: `${baseUrl}${req.url}` });
        return next.handle(apiReq);
    }
    }