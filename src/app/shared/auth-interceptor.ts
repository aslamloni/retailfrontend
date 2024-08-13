import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log(req.url);
    // const token = localStorage.getItem('token');
    // const reqWithHeader = req.clone({
    //     //headers: req.headers.set('Authorization', `Bearer ${JSON.parse(token)}`),
    //     setHeaders: {
    //       Authorization: 'Bearer `${JSON.parse(token)}`',
    //     },
    //   });
    //return next(reqWithHeader);
    return next(req);
  }