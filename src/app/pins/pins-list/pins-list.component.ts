import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateCustomerComponent } from 'src/app/customers/create-customer/create-customer.component';
import { Customer, Pin } from 'src/app/interface/customer';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AddPinComponent } from '../add-pin/add-pin.component';

@Component({
  selector: 'app-pins-list',
  templateUrl: './pins-list.component.html',
  styleUrls: ['./pins-list.component.scss'],
})
export class PinsListComponent {
  customerInfo$ = this.localStorageService._customerData$;
  pinInfo$ = this.localStorageService._pinData$;

  closeResult: string;
  tableData: [];
  customerRecords: Array<Customer> = [];
  pinRecords: Array<Pin> = [];

  constructor(
    private modalService: NgbModal,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.localStorageService.loadInfo('customerData');
    this.localStorageService.loadInfo('pinData');
    this.getLocalStorageCustomerData();
    this.getLocalStoragePinData();
  }

  openModal(requestFrom) {
    let componentName =
      requestFrom === 'customerModal'
        ? CreateCustomerComponent
        : AddPinComponent;
    this.manageModal(componentName);
  }

  manageModal(componentName) {
    const modalRef = this.modalService.open(componentName);
    modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  getLocalStorageCustomerData() {
    this.customerInfo$.subscribe((data) => {
      if (Object.entries(data).length !== 0) {
        this.customerRecords = data;
      }
    });
  }

  getLocalStoragePinData() {
    this.pinInfo$.subscribe((data) => {
      if (Object.entries(data).length !== 0) {
        this.pinRecords = data;
      }
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
