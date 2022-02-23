import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingRequest } from '../models/bookingRequest';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private httpClient: HttpClient) { }

  sendRequest(request: BookingRequest): Observable<any> {
    console.log("service")
    console.log(request)
    // var formData: any = new FormData();
    // formData.append("name", request.name);
    // formData.append("email", request.email);
    // formData.append("phone", request.phone);
    // formData.append("message", request.message);

    // console.log(formData)
    return this.httpClient.post<any>('api/sendRequest', request);
  }
}
