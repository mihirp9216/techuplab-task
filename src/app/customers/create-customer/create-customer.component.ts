import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit, OnDestroy {

  customerForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    email: new FormControl(''),
    region: new FormControl(''),
    country: new FormControl('')
  });
  submitted = false;

  constructor(
    private dataService: DataService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ){ }

  ngOnInit(){
    this.dataService.getRegion().subscribe((res) => {
      console.log(res);
    });
  //  this.dataService.getCountries().subscribe(() => {
  //  })
    this.customerForm = this.fb.group(
      {
        title: ['',
          [Validators.required,
          Validators.maxLength(20)]
        ],
        email: ['', [Validators.required, Validators.email]],
        region: ['', Validators.required,
        ],
        country: ['', Validators.required]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.customerForm.invalid) {
      return;
    }
    this.activeModal.close(this.customerForm.value);
  }

  ngOnDestroy(): void {
    this.submitted = false;
    this.customerForm.reset();
  }
}
