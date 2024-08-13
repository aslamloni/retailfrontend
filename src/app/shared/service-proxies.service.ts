import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { APP_CONFIG, appConfig } from '../app.config';
import { Observable, of as _observableOf } from 'rxjs';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServiceProxiesService {
  private http: any;
  private baseUrl: any;
  config: any;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(APP_CONFIG) config: typeof appConfig) {
    this.config = config;
    this.http = http;
    this.baseUrl = this.config.apiUrl !== undefined && this.config.apiUrl != null ? this.config.apiUrl : "";
  }

  CreateOrUpdateItem(body: Item | undefined): Observable<Item> {
    let url_ = this.baseUrl + "/api/Item";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json-patch+json",
      })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processCreateOrUpdateItem(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processCreateOrUpdateItem(<any>response_);
        } catch (e) {
          return <Observable<void>><any>_observableThrow(e);
        }
      } else
        return <Observable<void>><any>_observableThrow(response_);
    }));
  }

  protected processCreateOrUpdateItem(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return _observableOf<void>(<any>null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<void>(<any>null);
  }

  getItem(id: any): Observable<ItemList> {
    let url_ = this.baseUrl + "/api/Item";
    if (id !== undefined)
      url_ += "/" + encodeURIComponent("" + id)
    url_ = url_.replace(/[?&]$/, "");

    const token = JSON.parse(localStorage.getItem('token') || '{}');

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "text/plain",
        //'Authorization': `Bearer ${token}`
      })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processGetItems(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetItems(<any>response_);
        } catch (e) {
          return <Observable<ItemList>><any>_observableThrow(e);
        }
      } else
        return <Observable<ItemList>><any>_observableThrow(response_);
    }));
  }

  getItems(): Observable<ItemList> {
    let url_ = this.baseUrl + "/api/Item";
    url_ = url_.replace(/[?&]$/, "");

    const token = JSON.parse(localStorage.getItem('token') || '{}');

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "text/plain",
        //'Authorization': `Bearer ${token}`
      })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processGetItems(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetItems(<any>response_);
        } catch (e) {
          return <Observable<ItemList>><any>_observableThrow(e);
        }
      } else
        return <Observable<ItemList>><any>_observableThrow(response_);
    }));
  }

  protected processGetItems(response: HttpResponseBase): Observable<ItemList> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ItemList.fromJS(resultData200);
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<ItemList>(<any>null);
  }

  EditItem(body: Item | undefined): Observable<Item> {
    let url_ = this.baseUrl + "/api/Item";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json-patch+json",
      })
    };

    return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processEditeItem(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processEditeItem(<any>response_);
        } catch (e) {
          return <Observable<Item>><any>_observableThrow(e);
        }
      } else
        return <Observable<Item>><any>_observableThrow(response_);
    }));

  }

  protected processEditeItem(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return _observableOf<void>(<any>null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<void>(<any>null);
  }

  deleteItem(body: Item | undefined): Observable<Item> {
    let url_ = this.baseUrl + "/api/Item";
    // if (id !== undefined)
    //   url_ += "/" + encodeURIComponent("" + id)
    // url_ = url_.replace(/[?&]$/, "");

    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json-patch+json",
      })
    };

    // let options_: any = {
    //   observe: "response",
    //   responseType: "blob",
    //   headers: new HttpHeaders({
    //     "Accept": "text/plain",
    //     //'Authorization': `Bearer ${token}`
    //   })
    // };

    return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processDeleteItem(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processDeleteItem(<any>response_);
        } catch (e) {
          return <Observable<Item>><any>_observableThrow(e);
        }
      } else
        return <Observable<Item>><any>_observableThrow(response_);
    }));

  }

  protected processDeleteItem(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return _observableOf<void>(<any>null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<void>(<any>null);
  }
}

@Injectable({ providedIn: 'root', })
export class BillingProxiesService {
  private http: any;
  private baseUrl: any;
  config: any;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(APP_CONFIG) config: typeof appConfig) {
    this.config = config;
    this.http = http;
    this.baseUrl = this.config.apiUrl !== undefined && this.config.apiUrl != null ? this.config.apiUrl : "";
  }

  getBills(): Observable<BillList> {
    let url_ = this.baseUrl + "/api/Bill";
    url_ = url_.replace(/[?&]$/, "");

    const token = JSON.parse(localStorage.getItem('token') || '{}');

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "text/plain",
        //'Authorization': `Bearer ${token}`
      })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processGetBills(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetBills(<any>response_);
        } catch (e) {
          return <Observable<BillList>><any>_observableThrow(e);
        }
      } else
        return <Observable<BillList>><any>_observableThrow(response_);
    }));
  }

  protected processGetBills(response: HttpResponseBase): Observable<BillList> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = BillList.fromJS(resultData200);
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<BillList>(<any>null);
  }

}

export class UsersDto implements IUsers {
  id: any;
  userName: string | undefined;
  password: string | undefined;
  emailAddress: any;
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  gender: string | undefined;
  registrationDate: Date | undefined;
  lastLogin: Date | undefined;
  isActive: boolean | undefined;
  createdDate: Date | undefined;
  updatedDate: Date | undefined;

  constructor(data?: IUsers) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.userName = _data["userName"];
      this.password = _data["password"];
      this.emailAddress = _data["emailAddress"];
      this.firstName = _data["firstName"];
      this.lastName = _data["lastName"];
      this.dateOfBirth = _data["dateOfBirth"];
      this.gender = _data["gender"];
      this.registrationDate = _data["registrationDate"];
      this.lastLogin = _data["lastLogin"];
      this.isActive = _data["isActive"];
      this.createdDate = _data["createdDate"];
      this.updatedDate = _data["updatedDate"];
    }

  }

  static fromJS(data: any): UsersDto {
    data = typeof data === 'object' ? data : {};
    let result = new UsersDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["userName"] = this.userName;
    data["password"] = this.password;
    data["emailAddress"] = this.emailAddress;
    data["firstName"] = this.firstName;
    data["lastName"] = this.lastName;
    data["dateOfBirth"] = this.dateOfBirth;
    data["gender"] = this.gender;
    data["registrationDate"] = this.registrationDate;
    data["lastLogin"] = this.lastLogin;
    data["isActive"] = this.isActive;
    data["createdDate"] = this.createdDate;
    data["updatedDate"] = this.updatedDate;
    return data;
  }
}
export interface IUsers {
  id: any | undefined;
  userName: string | undefined;
  password: string | undefined;
  emailAddress: any | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  gender: string | undefined;
  registrationDate: Date | undefined;
  lastLogin: Date | undefined;
  isActive: boolean | undefined;
  createdDate: Date | undefined;
  updatedDate: Date | undefined;
}

export interface IBill {
  id: any | undefined,
  billType: number | undefined,
  name: string | undefined,
  contactNo: number | undefined,
  address: string | undefined,
  paymentMode: string | undefined,
  paymentStatus: string | undefined,
  isActive: boolean | undefined,
  createdDate: Date | undefined,
  updatedDate: Date | undefined,
  itemID: any | undefined,
  userId: any | undefined,
  quantity: number | undefined,
  totalAmount: number | undefined
}

export class Bill implements IBill {
  id: any | undefined;
  billType: number | undefined;
  name: string | undefined;
  contactNo: number | undefined;
  address: string | undefined;
  paymentMode: string | undefined;
  paymentStatus: string | undefined;
  isActive: boolean | undefined;
  createdDate: Date | undefined;
  updatedDate: Date | undefined;
  itemID: any | undefined;
  userId: any | undefined;
  quantity: number | undefined;
  totalAmount: number | undefined;
  purchaseDetailsList: [] | undefined;

  constructor(data?: IBill) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }
  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.billType = _data["billType"];
      this.name = _data["name"];
      this.contactNo = _data["contactNo"];
      this.address = _data["address"];
      this.paymentMode = _data["paymentMode"];
      this.paymentStatus = _data["paymentStatus"];
      this.itemID = _data["itemID"];
      this.userId = _data["userId"];
      this.isActive = _data["isActive"];
      this.createdDate = _data["createdDate"];
      this.updatedDate = _data["updatedDate"];
      this.quantity = _data["quantity"];
      this.totalAmount = _data["totalAmount"];
    }
  }
  static fromJS(data: any): Bill {
    data = typeof data === 'object' ? data : {};
    let result = new Bill();
    result.init(data);
    return result;
  }
  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["billType"] = this.billType;
    data["name"] = this.name;
    data["contactNo"] = this.contactNo;
    data["address"] = this.address;
    data["paymentMode"] = this.paymentMode;
    data["paymentStatus"] = this.paymentStatus;
    data["itemID"] = this.itemID;
    data["userID"] = this.userId;
    data["isActive"] = this.isActive;
    data["createdDate"] = this.createdDate;
    data["updatedDate"] = this.updatedDate;
    data["quantity"] = this.quantity;
    data["totalAmount"] = this.totalAmount;
    return data;
  }
}

export interface IPurchaseDetails{
  id: any | undefined;
  salePrice: number | undefined;
  discountPrice: number | undefined;
  cgst: number | undefined;
  sgst: number | undefined;
  discountedPrice: number | undefined;
  sgstPrice: number | undefined;
  cgstPrice: number | undefined;
  totalPrice: number | undefined;
  billID: any | undefined;
  itemID: any | undefined;
  userId: any | undefined;
}

export class PurchaseDetails implements IPurchaseDetails {
  id: any | undefined;
  salePrice: number | undefined;
  discountPrice: number | undefined;
  cgst: number | undefined;
  sgst: number | undefined;
  discountedPrice: number | undefined;
  sgstPrice: number | undefined;
  cgstPrice: number | undefined;
  totalPrice: number | undefined;
  billID: any | undefined;
  itemID: any | undefined;
  userId: any | undefined;

  constructor(data?: IPurchaseDetails) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.salePrice = _data["salePrice"];
      this.discountPrice = _data["discountPrice"];
      this.cgst = _data["cgst"];
      this.sgst = _data["sgst"];
      this.discountedPrice = _data["discountedPrice"];
      this.sgstPrice = _data["sgstPrice"];
      this.cgstPrice = _data["cgstPrice"];
      this.userId = _data["userId"];
      this.totalPrice = _data["totalPrice"];
      this.billID = _data["billID"];
      this.itemID = _data["itemID"];
    }
  }
  static fromJS(data: any): PurchaseDetails {
    data = typeof data === 'object' ? data : {};
    let result = new PurchaseDetails();
    result.init(data);
    return result;
  }
  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["salePrice"] = this.salePrice;
    data["discountPrice"] = this.discountPrice;
    data["sgstPrice"] = this.sgstPrice;
    data["cgstPrice"] = this.cgstPrice;
    data["cgstPrice"] = this.cgstPrice;
    data["userId"] = this.userId;
    data["totalPrice"] = this.totalPrice;
    data["billID"] = this.billID;
    data["itemID"] = this.itemID;
    return data;
  }
}

export interface IBillList {
  totalCount: number
  bills: Bill[] | undefined;
}
export class BillList implements IBillList {
  totalCount!: number;
  bills: Bill[] = [];

  constructor(data?: IBillList) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.totalCount = _data["totalCount"];
      for (let item of _data) {
        this.bills!.push(Bill.fromJS(item));
      }
    }
  }

  static fromJS(data: any): BillList {
    data = typeof data === 'object' ? data : {};
    let result = new BillList();
    result.init(data);
    return result;
  }
}

export interface IPurchaseDetailsList {
  totalCount: number;
  purchaseDetails: PurchaseDetails[] | undefined;
}

export class PurchaseDetailsList implements IPurchaseDetailsList {
  totalCount!: number;
  purchaseDetails: PurchaseDetails[] | undefined;

  constructor(data?: IPurchaseDetailsList) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.totalCount = _data["totalCount"];
      for (let item of _data) {
        this.purchaseDetails!.push(PurchaseDetails.fromJS(item));
      }
    }
  }

  static fromJS(data: any): PurchaseDetailsList {
    data = typeof data === 'object' ? data : {};
    let result = new PurchaseDetailsList();
    result.init(data);
    return result;
  }
}

export class Item implements IItem {
  itemId: any | undefined;
  itemName: string | undefined;
  itemCode: string | undefined;
  location: any | undefined;
  salePrice: number | undefined;
  purchasePrice: number | undefined;
  discountPrice: number | undefined;
  cgst: number | undefined;
  sgst: number | undefined;
  userID: any | undefined;
  isActive: boolean | undefined;
  createdDate: Date | undefined;
  updatedDate: Date | undefined;
  items: [] | undefined;

  constructor(data?: IItem) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.itemId = _data["itemId"];
      this.itemName = _data["itemName"];
      this.itemCode = _data["itemCode"];
      this.location = _data["location"];
      this.salePrice = _data["salePrice"];
      this.purchasePrice = _data["purchasePrice"];
      this.discountPrice = _data["discountPrice"];
      this.cgst = _data["cgst"];
      this.sgst = _data["sgst"];
      this.userID = _data["userID"];
      this.isActive = _data["isActive"];
      this.createdDate = _data["createdDate"];
      this.updatedDate = _data["updatedDate"];
    }

  }

  static fromJS(data: any): Item {
    data = typeof data === 'object' ? data : {};
    let result = new Item();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["itemId"] = this.itemId;
    data["itemName"] = this.itemName;
    data["itemCode"] = this.itemCode;
    data["location"] = this.location;
    data["salePrice"] = this.salePrice;
    data["purchasePrice"] = this.purchasePrice;
    data["discountPrice"] = this.discountPrice;
    data["cgst"] = this.cgst;
    data["sgst"] = this.sgst;
    data["userID"] = this.userID;
    data["isActive"] = this.isActive;
    data["createdDate"] = this.createdDate;
    data["updatedDate"] = this.updatedDate;
    return data;
  }
}

export interface IItem {
  itemId: any | undefined;
  itemName: string | undefined;
  itemCode: string | undefined;
  location: any | undefined;
  salePrice: number | undefined;
  purchasePrice: number | undefined;
  discountPrice: number | undefined;
  cgst: number | undefined;
  sgst: number | undefined;
  userID: any | undefined;
  isActive: boolean | undefined;
  createdDate: Date | undefined;
  updatedDate: Date | undefined;
  items: [] | undefined;
}

export interface IItem {
  itemId: any | undefined;
  itemName: string | undefined;
  itemCode: string | undefined;
  location: any | undefined;
  salePrice: number | undefined;
  purchasePrice: number | undefined;
  discountPrice: number | undefined;
  cgst: number | undefined;
  sgst: number | undefined;
  userID: any | undefined;
  isActive: boolean | undefined;
  createdDate: Date | undefined;
  updatedDate: Date | undefined;
  items: [] | undefined;
}

export interface IItemList {
  totalCount: number
  items: Item[] | undefined;
}

export class ItemList implements IItemList {
  totalCount!: number;
  items: Item[] = [];

  constructor(data?: IItemList) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.totalCount = _data["totalCount"];
      for (let item of _data) {
        this.items!.push(Item.fromJS(item));
      }
    }
  }

  static fromJS(data: any): ItemList {
    data = typeof data === 'object' ? data : {};
    let result = new ItemList();
    result.init(data);
    return result;
  }
}

export function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next("");
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = event => {
        observer.next((<any>event.target).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}

export class ApiException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any; };
  result: any;

  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

export function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
    return _observableThrow(result);
  else
    return _observableThrow(new ApiException(message, status, response, headers, null));
}
function _observableThrow(result: any): Observable<any> {
  throw new Error('Function not implemented.');
}


