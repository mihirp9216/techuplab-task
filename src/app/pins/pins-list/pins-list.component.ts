import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateCustomerComponent } from 'src/app/customers/create-customer/create-customer.component';

@Component({
  selector: 'app-pins-list',
  templateUrl: './pins-list.component.html',
  styleUrls: ['./pins-list.component.scss'],
})
export class PinsListComponent {

  closeResult: string;

  constructor(private modalService: NgbModal) {}

  openModal() {
    console.log('modal open');
    const modalRef = this.modalService.open(CreateCustomerComponent);
    modalRef.result.then(
      (result) => {
        console.log(result);
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      console.log('by pressing ESC');
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log('by clicking on a backdrop');
      return 'by clicking on a backdrop';
    } else {
      console.log('with', reason);
      return `with: ${reason}`;
    }
  }
}
