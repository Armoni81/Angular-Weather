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
}
