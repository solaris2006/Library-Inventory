import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { clippingParents } from '@popperjs/core';
import { Customer } from '../models/customer';
import { CustomerDto } from '../models/customer-dto';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Customer[] = []
  isFormOpen : boolean = false;

  customerForm: FormGroup = new FormGroup({
    idControl : new FormControl(''),
    nameControl : new FormControl(``, [Validators.required, Validators.minLength(2)]),
    dateOfBirthControl : new FormControl('', Validators.required)
  })

  constructor(private customerService: CustomerService) { }
  
  ngOnInit(): void {

    this.initializeData();
  }

  get idControl(): FormControl {
    return this.customerForm.controls['idControl'] as FormControl;
  }
  
  
  private initializeData() {
    this.customerService.get().subscribe(res =>  this.customers = res);
    
  }
  showForm(){
    this.isFormOpen = !this.isFormOpen;
    this.customerForm.reset();

  }

  onSubmit() {

    console.log(this.customerForm);
    if(!this.customerForm.valid) {
      return;
    }
    if(this.customerForm.controls['idControl'].value){
      this.editCustomer();
    }else {
      this.createCustomer()
    }


  }
  createCustomer() {
      const customerDTO: CustomerDto =  {
      name: this.customerForm.value.nameControl,
      dateOfBirth: this.customerForm.value.dateOfBirthControl
      }
  
      this.customerService.save(customerDTO).subscribe(() => {
        this.initializeData();
        this.isFormOpen = false;
      });
  }

  onRemove(customerId: string){
this.customerService.delete(customerId).subscribe(() => this.initializeData());
  }

onUpdate(customer :Customer){
  this.isFormOpen = true;
  this.customerForm.controls['idControl'].patchValue(customer.id);
  this.customerForm.controls['nameControl'].patchValue(customer.name);
  this.customerForm.controls['dateOfBirthControl'].patchValue(customer.dateOfBirth);

}

private editCustomer(){
  const customerDto :CustomerDto = {
    name : this.customerForm.value.nameControl,
    dateOfBirth : this.customerForm.value.dateOfBirthControl
  }
  this.customerService.update(this.customerForm.controls['idControl'].value,customerDto).subscribe(()=> {
  
    

    this.initializeData();
    this.isFormOpen = false;
  });
}
}
