import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

/*
  Provider to connect with PouchDB and CouchDB.
  Post and Get data from the database!
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

getPost() {
   if (this.data) {
   return Promise.resolve(this.data);
   }

   return new Promise(resolve => {

   this.db.allDocs({

     include_docs: true

   }).then((result) => {

     this.data = [];

     let docs = result.rows.map((row) => {
       this.data.push(row.doc);
     });

     resolve(this.data);
     });

   }).catch((error) => {

     console.log(error);

   });


   }
}
