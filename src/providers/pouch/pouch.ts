import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

/*
  Generated class for the PouchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PouchProvider {

  data: any;
  db: any;
  remote: any;

  constructor() {

    this.db = new PouchDB('skate');

    this.remote = 'http://localhost:5984/misc';

    let options = {
    live: true,
    retry: true,
    continuous: true
    };

    this.db.sync(this.remote, options);
  }
    handleChange(change){

    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {

      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    }
    else {

      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      }

      //A document was added
      else {
        this.data.push(change.doc);
      }

    }

  }
  getTags() {

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

      this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
        this.handleChange(change);
      });

    }).catch((error) => {

      console.log(error);

    });

  });

  }

  sendTags(tag) {
  this.db.post(tag);
  }

}
