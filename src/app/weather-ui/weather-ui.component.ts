import { Component, OnInit } from '@angular/core';
import { GetWeatherAPIService } from '../weatherService/get-weather-api.service';
import { WeatherDetails } from '../models/weather-details';


@Component({
  selector: 'app-weather-ui',
  templateUrl: './weather-ui.component.html',
  styleUrls: ['./weather-ui.component.css'],
})
export class WeatherUiComponent implements OnInit {
  inputCity: string = '';
  cityName: string = '';
  listOfCities: WeatherDetails[] = [];
  renderErrorDuplicateCity: boolean = false;
  renderError404:boolean = false
  disableSubmitBtn:boolean = true
  showUserSuccessfulAdd: boolean = false
  constructor(private apiService: GetWeatherAPIService) {}
  ngOnInit(): void {
   
    let readLocalStorage = this.apiService.readLocalStorage();

    this.listOfCities = readLocalStorage ? JSON.parse(readLocalStorage) : [];
  }
  checkStringLengthForSumbitButton(): void {
    if(this.inputCity.length <= 0){
      this.disableSubmitBtn =true
    }else{
     this.disableSubmitBtn = false
    }
  }
  onClick(): void {
    this.apiService.getWeather(this.inputCity).subscribe( 
      (data: any) => {

              let duplicateCity = Object.values(this.listOfCities).filter((obj) =>{
                return obj.city === this.apiService.correctInputString(data.name) + `, ${data.sys.country}`
              }
              );
      
              if (duplicateCity.length >= 1) {
                this.renderErrorDuplicateCity = true;
                this.inputCity = this.apiService.correctInputString(data.name);
                setTimeout(() => {
                  this.renderErrorDuplicateCity = false;
                  this.inputCity = '';
                }, 3000);
                this.disableSubmitBtn = true
                return;
              }
             
                let weatherDetails: WeatherDetails = {
                  city: this.apiService.correctInputString(data.name) + `, ${data.sys.country}`,
                  tempHi: Math.floor(1.8 * (data.main.temp_max - 273) + 32),
                  tempLow: Math.floor(1.8 * (data.main.temp_min - 273) + 32),
                  wind: data.wind.speed,
                  time: new Date().toLocaleString('en-US'),
                  humidity: data.main.humidity,
                };
        
                this.listOfCities.push(weatherDetails);
                localStorage.setItem('cities', JSON.stringify(this.listOfCities));
                this.disableSubmitBtn = true
                this.showUserSuccessfulAdd = true
                setTimeout(()=> {
                  this.inputCity = '';
                  this.showUserSuccessfulAdd = false
                },3000)

      }, 
      (error: any) => {
        this.renderError404 = true
        console.error('error fetching data', error)
        setTimeout(() => {
          this.renderError404 = false
          this.inputCity = ''
        },3000)
        this.disableSubmitBtn = true
      }
     
    );
  }
}
