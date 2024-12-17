import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'https://api.first.org/data/v1/countries';

  constructor(private http: HttpClient) { }

  // public getPins():Array<{id, name, description, email}>{
  //   return this.contacts;
  // }
  // public createContact(contact: {id, name, description, email}){
  //   this.contacts.push(contact);
  // }
  getRegion() {
    return this.http.get(this.url);
  }
}
