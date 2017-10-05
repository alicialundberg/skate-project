import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CouchServiceProvider } from '../../providers/couch-service/couch-service';
import { PouchProvider } from '../../providers/pouch/pouch';
import { Http } from '@angular/http';


@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
  providers: [PouchProvider]
})
export class AddDataPage {

  tags: any;
  post: any = {
      _id: null,
      description: '',
      nick: '',
      city: '',
      tags: '',
      type: 'post'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public addService: CouchServiceProvider, public pouchService: PouchProvider, public http: Http) {
  }

  ionViewDidLoad(){

    this.pouchService.getTags().then((data) => {
      this.tags = data;
      console.log(data);
    });
  }

  save() {

    this.post._id = this.post.description.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

    this.addService.addPost(this.post);

    this.navCtrl.pop();
  }

}
