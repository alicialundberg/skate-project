import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PouchProvider } from '../../providers/pouch/pouch';
import { CouchServiceProvider } from '../../providers/couch-service/couch-service';
import { AddDataPage } from '../add-data/add-data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PouchProvider, CouchServiceProvider]

})
export class HomePage {

  tags: any;
  data: any;

  constructor(public navCtrl: NavController, public pouchService: PouchProvider, public addService: CouchServiceProvider) {
  }


  ionViewDidLoad(){

    this.addService.getPost().then((data) => {
      this.data = data;
      console.log(data);
    });
  }

  pushAddDataPage(){
       this.navCtrl.push(AddDataPage);
   }
}
