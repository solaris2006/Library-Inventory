import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDto } from '../models/customer-dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = `http://localhost:8080/customers`;

  constructor(private httpClient : HttpClient) { }

  public get() : Observable<Customer[]>{
      return this.httpClient.get<Customer[]>(this.baseUrl);
  }

  public save(customerDto : CustomerDto) : Observable<void>{
    return this.httpClient.post<void>(this.baseUrl,customerDto);
  }

  public delete(customerId: string): Observable<void> {
   return this.httpClient.delete<void>(`${this.baseUrl}/${customerId}`);
  }

  public update(customerId : string,customerDto : CustomerDto) : Observable<void>{
    return this.httpClient.put<void>(`${this.baseUrl}/${customerId}`,customerDto)
  }

}
