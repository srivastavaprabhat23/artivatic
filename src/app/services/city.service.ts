import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(
    private http: HttpClient
  ) { }

  getStates(stateKeyword) {
    return fetch('https://indian-cities-api-nocbegfhqg.now.sh/cities?State_like='+stateKeyword, {
      mode: "cors"
    })
  }

  getCities(cityKeyword) {
    return fetch('https://indian-cities-api-nocbegfhqg.now.sh/cities?State_like='+cityKeyword, {
      mode: "cors"
    })
  }
}
