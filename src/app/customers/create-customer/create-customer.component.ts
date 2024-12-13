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
  regionData: any[];
  countryData: any[];

  constructor(
    private dataService: DataService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ){}

  ngOnInit(){
    this.getRegionCountry();
    this.customerForm = this.fb.group({
        title: ['',[ Validators.required, Validators.maxLength(20) ]],
        email: ['', [Validators.required, Validators.email]],
        region: ['', Validators.required],
        country: ['', Validators.required]
      });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  getRegionCountry(){
    this.dataService.getRegion().subscribe((res) => {

      // need to convert the result in to array for processed the data.
      const obj = Object.keys(res).map((key) => res[key]);
      const obj1 = Object.keys(obj[7]).map((key) => obj[7][key]);

      // getting data with groupby to fitered the countries based on Region
      const group = obj1.reduce((acc: any, curr) => {
        let key = curr.region;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(curr);
        return acc;
      }, {});
      // finally get the filtered result after groupby.
      const groupByDetails = Object.keys(group ).map(key => ({
        region: key,
        countries: group[key]
      }));

      this.regionData = groupByDetails;
      this.customerForm.valueChanges
      .subscribe((subscriptionTypeId) => {
        const regionObj = this.regionData.find(item => item.region === subscriptionTypeId.region);
        if(regionObj){
          this.countryData = regionObj.countries;
        }
      });
    });
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
