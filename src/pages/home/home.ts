import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PouchProvider } from '../../providers/pouch/pouch';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PouchProvider]

})
export class HomePage {

  tags: any;

  constructor(public navCtrl: NavController, public pouchService: PouchProvider) {

  }

  ionViewDidLoad(){

    this.pouchService.getTags().then((data) => {
      this.tags = data;
      console.log(data);
    });

}

}
