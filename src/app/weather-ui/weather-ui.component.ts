import { Component, OnInit } from '@angular/core';
import { GetWeatherAPIService } from '../weatherService/get-weather-api.service';
import { WeatherDetails } from '../models/weather-details';

@Component({
  selector: 'app-weather-ui',
  templateUrl: './weather-ui.component.html',
  styleUrls: ['./weather-ui.component.css']
})
export class WeatherUiComponent implements OnInit {
  inputCity: string = ''
  cityName:string = ''
  listOfCities:WeatherDetails[]=[]
  renderErrorDuplicateCity:boolean= false
  constructor( private apiService: GetWeatherAPIService ){
    
  }
  ngOnInit(): void {
    console.log(this.apiService.readLocalStorage(), 'lol')
    let readLocalStorage = this.apiService.readLocalStorage()

    this.listOfCities = readLocalStorage ? JSON.parse(readLocalStorage): []
    
  }
 onClick(): void{
  
    this.apiService.getWeather(this.inputCity).subscribe( (data: any) => {
      console.log(data)
      //check to see if the requested city nsme has already been requested'const z
      let duplicateCity =Object.values(this.listOfCities).filter(obj => obj.city === this.inputCity)

      if( duplicateCity.length >= 1){
        console.log('in')
        this.renderErrorDuplicateCity =true
        setTimeout(()=>{
          this.renderErrorDuplicateCity =false
           this.inputCity= ''
        },3000)

        return
      }
      if(data.cod === 200){
        let weatherDetails: WeatherDetails ={ 
           city:data.name.toLowerCase(),
           tempHi:Math.floor(1.8*(data.main.temp_max-273)+ 32),
           tempLow:Math.floor(1.8*(data.main.temp_min-273) + 32),
           wind:data.wind.speed,
           time: new Date().toLocaleString('en-US'),
           humidity:data.main.humidity
        }
        
        this.listOfCities.push(weatherDetails)
      this.inputCity= ''
        localStorage.setItem('cities', JSON.stringify(this.listOfCities))
      }
      console.log(this.listOfCities)
    })
 } 
}


