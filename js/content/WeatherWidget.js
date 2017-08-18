import React from 'react';
import axios from 'axios';
import Chart from 'chart.js';

import weatherWeekDataById from './weatherWeekDataById';

export default class WeatherWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      midTemp:0,
    };
    this.saveClick = this.saveClick.bind(this);
    this.graphClick = this.graphClick.bind(this);
    this.dateOptions = {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      month: 'short',
      day: 'numeric',
      timezone: 'UTC'
    };

    this.timeOptions = {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      timezone: 'UTC'
    };
  }

  // save weather as image
  saveClick(e) {
    e.preventDefault();
    var obj = {
      name: this.props.name,
      country: this.props.sys.country,
      temp: Math.round((this.props.main.temp-272.15)*10)/10,
      icon: this.props.weather[0].icon,
      windSpeed: this.props.wind.speed,
      windDeg: Math.round(this.props.wind.deg || 0),
      description: this.props.weather[0].description,
      date: (new Date(this.props.dt*1000)).toLocaleString("en-US", this.dateOptions),
      cloudiness: this.props.weather[0].main,
      pressure: this.props.main.pressure,
      humidity: this.props.main.humidity,
      sunrise: (new Date(this.props.sys.sunrise*1000)).toLocaleString("en-US", this.timeOptions),
      sunset: (new Date(this.props.sys.sunset*1000)).toLocaleString("en-US", this.timeOptions),
      lat: this.props.coord.lat,
      lon: this.props.coord.lon,
    };
    var str = 'val='+JSON.stringify(obj);
    axios({
      method: 'post',
      url: '/image', 
      data: str
    }).then(function(response) {
      location = response.data;
    });
  }

  // plot line graph
  graphClick(e) {
    var self = this;
    e.preventDefault();
    weatherWeekDataById({id:this.props.id}, function(obj) {
      if (obj) {
        var ctx = document.getElementById("myChart").getContext('2d');
        self.setState({
          midTemp: obj.middle,
        })
        const dateOptions = {
          month: 'short',
          day: 'numeric',
          timezone: 'UTC'
        };
        const timeOptions = {
          hour12: false,
          hour: 'numeric',
        };
        Chart.defaults.global.legend = false;
        var myChart = new Chart(ctx, {
          type: 'line',

          data: {
              labels: obj.listLabel,
              datasets: [{
                  borderColor: 'rgb(255, 99, 132)',
                  data: obj.listValue,
              }]
          },

          options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                            return value + "°C";
                        }
                    },
                }],

                xAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                            let dt = new Date(value*1000)
                            let val = dt.toLocaleString("en-US", dateOptions);
                            let hour = dt.toLocaleString("en-US", timeOptions);
                            if (hour == '00') return val
                            else return hour+':00';
                        },
                        maxRotation: 0
                    },
                }]
            }
        }
        });
      }
    });
  }

	render() {
	  return (
      <div className="weather-widget anim_fadein">
        <h2 className="weather-widget__city-name">Weather in {this.props.name+', '+this.props.sys.country}</h2>
        <h3 className="weather-widget__temperature">
          <img alt={'Weather '+this.props.name+', '+this.props.sys.country} src={'http://openweathermap.org/img/w/'+this.props.weather[0].icon+'.png'} height="50" width="50" />{Math.round((this.props.main.temp-272.15)*10)/10} °C
        </h3>
        <p className="weather-widget__main">{this.props.weather[0].description}</p>
        <p>{(new Date(this.props.dt*1000)).toLocaleString("en-US", this.dateOptions)}</p>
        <table className="weather-widget__items">
          <tbody>
            <tr className="weather-widget__item">
              <td>Wind</td>
              <td id="weather-widget-wind">{this.props.wind.speed} m/s{this.props.wind.deg && ', '+Math.round(this.props.wind.deg)+' °'}</td>
            </tr>
            <tr className="weather-widget__item">
              <td>Cloudiness</td>
              <td id="weather-widget-cloudiness">{this.props.weather[0].main}</td>
            </tr>
            <tr className="weather-widget__item">
              <td>Pressure</td>
              <td>{this.props.main.pressure} hpa</td>
            </tr>
            <tr className="weather-widget__item">
              <td>Humidity</td>
              <td>{this.props.main.humidity} %</td>
            </tr>
            <tr className="weather-widget__item">
              <td>Sunrise</td>
              <td>{(new Date(this.props.sys.sunrise*1000)).toLocaleString("en-US", this.timeOptions)}</td>
            </tr>
            <tr className="weather-widget__item">
              <td>Sunset</td>
              <td>{(new Date(this.props.sys.sunset*1000)).toLocaleString("en-US", this.timeOptions)}</td>
            </tr>
            <tr className="weather-widget__item">
              <td>Geo coords</td>
              <td>
                [<span id="wrong-data-lat">{this.props.coord.lat}</span>,&nbsp;<span id="wrong-data-lon">{this.props.coord.lon}</span>]
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <div className="text-center">
          <button className="btn btn-orange" onClick={this.saveClick}>Save as png</button>
          <button className="btn btn-orange" onClick={this.graphClick}>Last week</button>
        </div>
        {this.state.midTemp !== 0 && <h3>Average temperature for the period: {this.state.midTemp}°C</h3>}
        <canvas id="myChart" width="800" height="400"></canvas>
      </div>
		);
	}
}