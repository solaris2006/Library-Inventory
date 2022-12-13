import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookRegistry } from '../models/book-registry';
import { BookRegistryDto } from '../models/book-registry-dto';
import { BookRegistryService } from '../services/book-registry.service';

@Component({
  selector: 'app-book-registry',
  templateUrl: './book-registry.component.html',
  styleUrls: ['./book-registry.component.css']
})
export class BookRegistryComponent implements OnInit {
registryForm: FormGroup = new FormGroup({
  idControl: new FormControl(''),
  bookIdControl: new FormControl('', Validators.required),
  customerIdControl: new FormControl('', Validators.required)
})

  isFormOpen : boolean = false;
  registries:  BookRegistry[] = [];

  constructor( private bookRegistryService: BookRegistryService) { }

  ngOnInit(): void {

    this.initializeData();
  }

  get idControl () : FormControl{
   return this.registryForm.controls['idControl'] as FormControl
  }


  initializeData() {
    this.bookRegistryService.getAll().subscribe(response => this.registries = response);
  }

  showForm(){
    this.isFormOpen = !this.isFormOpen
    this.registryForm.reset();
  }

  onSubmit(){
    if(!this.registryForm.valid){
      return;
      
    }
    
    if(this.idControl.value) {
      this.edit()
    }else {
      this.create()
    }


  }
  create() {
    const bookRegistryDto:  BookRegistryDto = {
      bookId:  this.registryForm.controls['bookIdControl'].value,
      customerId : this.registryForm.controls['customerIdControl'].value
    }

    this.bookRegistryService.reserve(bookRegistryDto).subscribe(() => this.initializeData()
    )
    
  }
  edit() {
    throw new Error('Method not implemented.');
  }
  




}
