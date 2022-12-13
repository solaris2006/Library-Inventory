import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { BookDto } from '../models/book-dto';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly BASE_URL:string ="http://localhost:8080/books";

  constructor(private httpClient: HttpClient) { }


  public save(dto: BookDto): Observable<void>{
   return this.httpClient.post<void>(this.BASE_URL,dto);
  }

  public getAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.BASE_URL);
  }

  public delete(bookId: string):Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${bookId}`);
  }

  public edit(bookId:string, dto:BookDto):Observable<void> {
    return this.httpClient.put<void>(`${this.BASE_URL}/${bookId}`,dto);
  }

}
