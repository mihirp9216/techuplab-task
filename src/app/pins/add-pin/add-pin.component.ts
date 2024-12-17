import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { Pin } from 'src/app/interface/customer';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

function readBase64(file): Promise<any> {
  var reader = new FileReader();
  var future = new Promise((resolve, reject) => {
    reader.addEventListener(
      'load',
      function () {
        resolve(reader.result);
      },
      false
    );

    reader.addEventListener(
      'error',
      function (event) {
        reject(event);
      },
      false
    );

    reader.readAsDataURL(file);
  });
  return future;
}

const URL = 'http://localhost:3000/fileupload/';
@Component({
  selector: 'app-add-pin',
  templateUrl: './add-pin.component.html',
  styleUrls: ['./add-pin.component.scss'],
})
export class AddPinComponent implements OnDestroy {
  customerInfo$ = this.localStorageService._customerData$;
  pinInfo$ = this.localStorageService._pinData$;

  pinForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    image: new FormControl('', [Validators.required]),
    collaborators: new FormControl('', Validators.required),
    privacy: new FormControl('', Validators.required),
  });

  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['image', 'pdf'],
  });

  submitted = false;
  pinRecords: Array<Pin> = [];
  public hasBaseDropZoneOver: boolean = false;

  fileObject: any;
  collaboratory: Array<any> = [];

  constructor(
    private dataService: DataService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.getLocalStorageCustomerData();
    this.getLocalStoragePinData();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.pinForm.controls;
  }

  onSubmit() {
    let pinFormData = this.pinForm.value;
    // this.localStorageService.storeAfterSubmit('pinData', pinFormData); // this will call for common save after submit function
    this.submitted = true;
    if (this.pinForm.invalid) {
      return;
    }

    this.pinRecords.push(pinFormData);
    this.localStorageService.setInfo('pinData', this.pinRecords);
    this.activeModal.close(pinFormData);
  }

  public onFileSelected(event: Event) {
    const file: File = event[0];

    readBase64(file).then(function (data) {});
  }

  getLocalStorageCustomerData() {
    let customerRecords = [];
    this.customerInfo$.subscribe((data) => {
      if (Object.entries(data).length !== 0) {
        customerRecords = data;
        customerRecords.forEach((cust: any) => {
          this.collaboratory.push(cust.name);
        });
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

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  ngOnDestroy(): void {
    this.submitted = false;
    this.pinForm.reset();
  }
}
