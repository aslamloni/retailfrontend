import { Injectable, Inject, Optional } from '@angular/core';
import { APP_CONFIG, appConfig } from '../../../app.config';

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { UsersDto, blobToText, throwException } from '../../../shared/service-proxies.service';
import { AuthServiceService } from '../../../shared/auth-service.service';


@Injectable()
export class LoginService {
  private http: any;
  private baseUrl: any;
  private config: any;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(
  @Inject(HttpClient) http: HttpClient,
  private authServiceService: AuthServiceService,
  @Optional() @Inject(APP_CONFIG) config: typeof appConfig
  ) {
    this.config = config;
    this.http = http;
    this.baseUrl = this.config.apiUrl !== undefined && this.config.apiUrl != null ? this.config.apiUrl : "";
  }

  authenticate(user: UsersDto): Observable<UsersDto> {
    let url_ = this.baseUrl + "/api/Login?";
    if (user.userName === null)
      throw new Error("The parameter 'userName' cannot be null.");
    else if (user.userName !== undefined)
      url_ += "UserName=" + encodeURIComponent("" + user.userName) + "&";
    if (user.password === null)
      throw new Error("The parameter 'Password' cannot be null.");
    else if (user.password !== undefined)
      url_ += "Password=" + encodeURIComponent("" + user.password) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        //"Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processAuthenticate(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processAuthenticate(<any>response_);
        } catch (e) {
          return <Observable<UsersDto>><any>_observableThrow(e);
        }
      } else
        return <Observable<UsersDto>><any>_observableThrow(response_);
    }));
  }

  protected processAuthenticate(response: HttpResponseBase): Observable<UsersDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        //let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        //result200 = UsersDto.fromJS(resultData200);
        // result200 = _responseText.toString();
        // localStorage.setItem('token',result200);
        this.authServiceService.setToken(_responseText);
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<UsersDto>(<any>null);
  }

}
