import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherAPIService {

  constructor(private http:HttpClient) { }

  getWeather(input:string):any{
    return this.http.get<any[]>(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=7983f9630bd1335bc5529b4c48cf145a`);
  }
  readLocalStorage() :string | null {
    return localStorage.getItem('cities')

  }
  correctInputString(str: string) :string{
      const toArray = str.split(str[0])[1]
      console.log(str[0].toUpperCase() + toArray.toLowerCase(), 'geeked')
      return str[0].toUpperCase() + toArray.toLowerCase()
  }
  checkStringLengthForSumbitButton(str:string): boolean {
    if(str.length <= 0){
      return true
    }else{
     return false
    }
  }


}
