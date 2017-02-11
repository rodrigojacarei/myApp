import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';
import { LoginPage } from '../login/login';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage {

  user: any;
  userReady: boolean = false;
  status: boolean = false;
  posts: any;

  constructor(public navCtrl: NavController, private http:Http) {}

  ionViewCanEnter(){
    let env = this;
    NativeStorage.getItem('user')
    .then(function (data){
      env.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
        env.userReady = true;
    }, function(error){
      console.log(error);
    });
  }

  doFbLogout(){
    var nav = this.navCtrl;
    Facebook.logout()
    .then(function(response) {
      //user logged out so we will remove him from the NativeStorage
      NativeStorage.remove('user');
      nav.push(LoginPage);
    }, function(error){
      console.log(error);
    });
  }

  doFbCheckStatus(){
    var nav = this.navCtrl;
    let env = this;
    Facebook.getLoginStatus()
    .then(function(response) {
      console.log(response);
      env.status = true;
    }, function(error){
      console.log(error);
      env.status = false;
    });
  }

    makePost() {
        let env = this;
        //var url = 'https://randomuser.me/api/';
        var url = 'https://graph.facebook.com/v2.8/146029542437567/feed?access_token=EAACEdEose0cBAPPYiXvpNVwwiJ8OnBLI7VqkHpMbM9kquM6ek7ZC7IsZAWYH4tk6sXEss0nHWFI14fN9VUZBFbe59EaIaZA54wLnvcAdbEvHPQxijbA2fLLXleaSfQGpez2oO7PWXnKom3ulHasfkFEnZCFDDmSmcc0qH9EzQDbxywZCDH6Y2un8hvou3DQf0ZD&debug=all&format=json&method=get&pretty=0&suppress_http_code=1'
        var response = this.http.get(url).map(res => res.json()).subscribe(data => {
      console.log(data);
	env.posts = data;
    });
  }
}
