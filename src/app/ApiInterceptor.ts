import { Injectable } from '@angular/core';
import { tap, finalize } from 'rxjs/operators';
import {HttpErrorResponse, HttpInterceptor, HttpHandler, HttpResponse, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from "./data.service";


let ok: string;

@Injectable()
export class ApiInterceptor implements HttpInterceptor {  	
  constructor(private data: DataService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	function getTimeStamp() {
    	var now = new Date();
    	return ((now.getMonth() + 1) + '/' +
            (now.getDate()) + '/' +
             now.getFullYear() + " " +
             now.getHours() + ':' +
             ((now.getMinutes() < 10)
                 ? ("0" + now.getMinutes())
                 : (now.getMinutes())) + ':' +
             ((now.getSeconds() < 10)
                 ? ("0" + now.getSeconds())
                 : (now.getSeconds())));
	}
 	return next.handle(req).pipe(
	  tap(
    	(event: HttpEvent<any>) => ok = event instanceof HttpResponse ? 'succeeded' : '',
    	(error: HttpErrorResponse) => ok = "failed"
  	  ),
  	  // Log when response observable either completes or errors
  	  finalize(() => {    	
    	let timestamp = getTimeStamp();
    	const msg = `Interception at ${timestamp} with text ${req.params.get('text')} and number ${req.params.get('number')} `;
    	this.data.addMessage(msg);    	
  	  })
	); 	
  };  
}