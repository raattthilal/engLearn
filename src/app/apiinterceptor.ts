
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable()
export class Apiinterceptor implements HttpInterceptor {
  

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const baseUrl = "https://www.letstalkenglish.co.in:";
        // const baseUrl = "https://65.1.247.168:";
        // const baseUrl = "http://localhost:";
        const apiReq = req.clone({ url: `${baseUrl}${req.url}` });
        return next.handle(apiReq);
    }
    }