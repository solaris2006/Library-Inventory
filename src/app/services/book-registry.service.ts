import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookRegistry } from '../models/book-registry';
import { BookRegistryDto } from '../models/book-registry-dto';

@Injectable({
  providedIn: 'root'
})
export class BookRegistryService {
private readonly BASE_URL:string = 'http://localhost:8080/registry'


  constructor(private httpClient: HttpClient) { }


  public getAll(): Observable<BookRegistry[]> {
    return this.httpClient.get<BookRegistry[]>(this.BASE_URL);
  }

  public reserve(bookRegistryDTO: BookRegistryDto): Observable<void> {
    return this.httpClient.post<void>(this.BASE_URL, bookRegistryDTO);
  }

  public cancelReservation(registryId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${registryId}`);
  }

}
