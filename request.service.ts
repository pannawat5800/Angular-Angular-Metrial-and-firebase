import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private firebaseDB: AngularFireDatabase) { 
    
  }

  getListObject()
  {
    return this.firebaseDB.list('List').valueChanges();
  }
}
