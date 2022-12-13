import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { BookDto } from '../models/book-dto';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  allBooks: Book[] = [];
  isFormOpen: boolean = false;
  bookForm : FormGroup = new FormGroup ({
    idControl: new FormControl(''),
    nameControl : new FormControl('',Validators.required),
    genreControl:  new FormControl('', Validators.required),
    descriptionControl : new FormControl('', Validators.required),
    isAdultContentControl : new FormControl(false)
    
  })

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  get idControl(): FormControl {
    return this.bookForm.controls['idControl'] as FormControl;
  }

  showForm() {
    this.isFormOpen = !this.isFormOpen;
    this.bookForm.reset();
  }


  onRemove(bookId: string) {
  this.bookService.delete(bookId).subscribe(() => this.initializeData());
  }

  private initializeData() {
    this.bookService.getAll().subscribe(response => this.allBooks = response);
  }

  onSubmit () {

    if (!this.bookForm.valid){
        return;
    }
    if(this.idControl.value){
    this.edit();
  }else{
    this.create();
  }
  }
  edit() {
    const bookDto : BookDto = {
      name : this.bookForm.controls['nameControl'].value,
      genre : this.bookForm.controls['genreControl'].value,
      description : this.bookForm.controls['descriptionControl'].value,
      isAdultContent : this.bookForm.controls['isAdultContentControl'].value || false
      
    }
    
    this.bookService.edit(this.idControl.value,bookDto).subscribe(()=>{
      this.initializeData();
      this.isFormOpen = false;
    });
  }


  create() {
    const bookDto: BookDto =  {
        name:  this.bookForm.controls['nameControl'].value,
        description :  this.bookForm.controls['descriptionControl'].value,
        genre : this.bookForm.controls['genreControl'].value,
        isAdultContent:  this.bookForm.controls['isAdultContentControl'].value
    } 
  this.bookService.save(bookDto).subscribe(() => this.initializeData());

  }

  onEdit(book: Book) {
    this.isFormOpen = true;
  this.bookForm.controls['idControl'].patchValue(book.id);
  this.bookForm.controls['nameControl'].patchValue(book.name);
  this.bookForm.controls['descriptionControl'].patchValue(book.description);
  this.bookForm.controls['genreControl'].patchValue(book.genre);
  this.bookForm.controls['isAdultContentControl'].patchValue(book.isAdultContent);
  }








 

}
