import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private customerData$ = new BehaviorSubject<any>(null);
  public _customerData$ = this.customerData$.asObservable();
  private pinData$ = new BehaviorSubject<any>(null);
  public _pinData$ = this.pinData$.asObservable();

  constructor() {}

  setInfo(dataFrom: string, data) {
    localStorage.setItem(dataFrom, JSON.stringify(data));
    this.dispatchedData(dataFrom, data);
  }

  loadInfo(dataFrom: string) {
    let parsedData = JSON.parse(localStorage.getItem(dataFrom) ?? '');
    this.dispatchedData(dataFrom, parsedData);
  }

  clearInfo(dataFrom: string) {
    localStorage.removeItem(dataFrom);
    this.dispatchedData(dataFrom, null);
  }

  clearAllLocalStorage() {
    localStorage.clear();
    //  this._customerData$.next(null);
  }

  dispatchedData(dataFrom, data) {
    dataFrom === 'customerData'
      ? this.customerData$.next(data)
      : this.pinData$.next(data);
  }

  // We can write this kind of function that workds commonaly to store the data after submit clicks
  // storeAfterSubmit(dataFrom, formData) {
  //   // let customerData = formData.value;
  //   let parsedData = JSON.parse(localStorage.getItem(dataFrom) ?? '');
  //   console.log(parsedData);
  //   let records: any[] = [];
  //   if (Object.entries(parsedData).length !== 0) {
  //     records = parsedData;
  //   }
  //   if (dataFrom === 'customerData') {
  //     let isInCart = false;
  //     if (records.length !== 0) { // this if for checkoing the duplicate entry for customer records.
  //       isInCart = records.some((item) => item.email === formData.email);
  //       !isInCart ? records.push(formData) : false; // we can add a notifuication instead of false that the record is alreday exist.
  //     } else {
  //       records.push(formData);
  //     }
  //   } else {
  //     records.push(formData); // this will directly push the record for pin without duplication check.
  //   }
  //   this.setInfo(dataFrom, records);
  // }
}
