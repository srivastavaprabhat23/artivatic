import { Component, OnInit } from '@angular/core';
import { CityService } from './../../services/city.service';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-cities',
  templateUrl: './show-cities.component.html',
  styleUrls: ['./show-cities.component.scss']
})

export class ShowCitiesComponent implements OnInit {
  private _success = new Subject<string>();
  states;
  cities;
  mapCity='Delhi';
  error;
  stateLoader=false;
  cityLoader=false;
  stateBox = true;
  cityBox=true;
  staticAlertClosed = false;
  stateWarning = '';

  onClickedOutsideState(e: Event) {   
    var temp=String(e);
    if(temp!="dropbtn" && temp!="stateItem"){
      document.getElementById('stateList').style.display='none';
    }   
  }
  constructor(
    private cityService: CityService,
  ) { }
  
 
  onClickedOutsideCity(e: Event) {
    var temp=String(e);
//dropbtn stateItem
    if(temp!="cityDropbtn" && temp!="cityItem"){
      document.getElementById('cityList').style.display='none';
    }
  }
  ngOnInit():void {
    let stateKeyword='';
    this.callStateApi(stateKeyword);
      setTimeout(() => this.staticAlertClosed = true, 20000);

      this._success.subscribe(message => this.stateWarning = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => this.stateWarning = '');
    }

    public changeSuccessMessage() {
      this._success.next('Please select state first.');
    }

  callStateApi(stateKeyword){
    this.stateLoader=true;
    this.cityService.getStates(stateKeyword).then(response => {
      return response.json().then(data => {
        if (response.ok) {
          return data;
        } else {
          return Promise.reject({ status: response.status, data });
        }
      });
    }).then(result => {
      let tempStatesObj = {};
      let tempStatesArray=[]
      result.forEach( function( item ) {
        let eachState = tempStatesObj[item.State];
        if( ! eachState ) {
            eachState = tempStatesObj[item.State] = {};
            tempStatesArray.push( item.State)
        }
      });
      this.states=tempStatesArray;
      this.stateLoader=false;
    }).catch(error => console.log('error:', error));
  }

  callCityApi(cityKeyword){
    this.cityLoader=true;
    this.cityService.getCities(cityKeyword).then(response => {
      return response.json().then(data => {
        if (response.ok) {
          return data;
        } else {
          return Promise.reject({ status: response.status, data });
        }
      });
    }).then(result => {
      this.cities=result;
      this.cityLoader=false;
    }).catch(error => console.log('error:', error));
  }

  searchState() {
    // this.stateBox = true;
    var stateKeyword =(<HTMLInputElement>document.getElementById("selectedState")).value;
    this.callStateApi(stateKeyword);
  }

  displayStateList(){
    // this.stateBox = true;
    document.getElementById("stateList").style.display="block";
  }

  setState(state){
    (<HTMLInputElement>document.getElementById("selectedState")).value=state;
    document.getElementById("stateList").style.display="none";
    let cityKeyword=state;
    this.callCityApi(cityKeyword);
    // this.stateBox = false;
  }

  searchCity() {
    // this.stateBox = true;
    var cityKeyword =(<HTMLInputElement>document.getElementById("selectedCity")).value;   
    this.callCityApi(cityKeyword);
  }

  displayCityList(){
    // this.cityBox = true;
    var isState =(<HTMLInputElement>document.getElementById("selectedState")).value;
    if(isState==''){
      this.changeSuccessMessage()
      this.cityLoader=true;
    }
    document.getElementById("cityList").style.display="block";
  }

  setCity(city){
    (<HTMLInputElement>document.getElementById("selectedCity")).value=city;
    document.getElementById("cityList").style.display="none";
    this.mapCity=city;
    document.getElementById('mapSrc').setAttribute("src","https://www.google.com/maps/embed/v1/place?q="+city+"&key="+environment.googleApiKey)
  } 

}
