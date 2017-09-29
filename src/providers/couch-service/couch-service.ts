import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

/*
  Provider to connect with PouchDB and CouchDB.
  Push data to the database!
*/

@Injectable()
export class CouchServiceProvider {

data: any;
db: any;
remote: any;

constructor() {

  this.db = new PouchDB('pushData');

  this.remote = 'http://nile16.nu:5984/skate/';

  let options = {
  live: true,
  retry: true,
  continuous: true
  };

  this.db.sync(this.remote, options);

}

addPost(post): void {
       this.db.put(post);
   }

}
