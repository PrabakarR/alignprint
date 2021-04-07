import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.baseURL;
  constructor(public httpClient: HttpClient) { }
  getOrders() {
    let url = this.baseUrl + 'Order/get'
    return this.httpClient.get(url).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }
  placeOrder(postData, file) {
    let url = this.baseUrl + 'Order/create';
    var formData = new FormData();
    formData.append('CustomerId', postData.CustomerId);
    formData.append('CaseColor', postData.CaseColor);
    formData.append('Address', postData.Address);
    formData.append('OrderDate', postData.OrderDate);
    formData.append('OrderStatus', postData.OrderStatus);
    formData.append('Attachments', file);
    return this.httpClient.post(url,formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }
  updateOrderStatus(orderId,postData) {
    let url = this.baseUrl + 'Order/'+orderId+'/status';
    return this.httpClient.put(url,postData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }
}
