import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/interface/customer';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
})
export class CreateCustomerComponent implements OnInit, OnDestroy {
  customerInfo$ = this.localStorageService._customerData$;

  customerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    region: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });
  submitted = false;
  regionData: any[];
  countryData: any[];
  customerRecords: Array<Customer> = [];

  constructor(
    private dataService: DataService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.getRegionCountry();
    this.getLocalStorageData();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  getRegionCountry() {
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
      const groupByDetails = Object.keys(group).map((key) => ({
        region: key,
        countries: group[key],
      }));

      this.regionData = groupByDetails;
      this.customerForm.valueChanges.subscribe((subscriptionTypeId) => {
        const regionObj = this.regionData.find(
          (item) => item.region === subscriptionTypeId.region
        );
        if (regionObj) {
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
    let customerData = this.customerForm.value;
    let isInCart = false;

    if (this.customerRecords.length !== 0) {
      isInCart = this.customerRecords.some(
        (item) => item.email === customerData.email
      );
      !isInCart ? this.customerRecords.push(customerData) : false; // we can add a notifuication instead of false that the record is alreday exist.
    } else {
      this.customerRecords.push(customerData);
    }
    this.localStorageService.setInfo('customerData', this.customerRecords);
    this.activeModal.close(customerData);
  }

  getLocalStorageData() {
    this.customerInfo$.subscribe((data) => {
      if (Object.entries(data).length !== 0) {
        this.customerRecords = data;
      }
    });
  }

  ngOnDestroy(): void {
    this.submitted = false;
    this.customerForm.reset();
  }
}
