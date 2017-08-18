import axios from 'axios';

import weatherDataByName from './WeatherDataByName';
import weatherDataByCoords from './WeatherDataByCoords';
/**
	get weather in current sity
*/
export default function startWeatherData(clb) {
	'use strict';
	
	// this sity used, when geoip not working
	const defaultSity = 'london';
	// max time waiting geoip, ms
	const maxTimeout = 3000;
	// timer loading default sity
	let defTimer = null;
	// 
	const maxStorageTime = 600000;

	// try find in local storage
	var current = {};
	try {
		current = JSON.parse(localStorage.getItem('current'));
		let dateInStorage = current.casheTime;
	    let now = new Date().getTime();
	    if (now - dateInStorage < maxStorageTime) {
	        clb(current);
	        return;
	    }
	    else {
	        // cashe too old
	        localStorage.removeItem(sity);
	    }
	}
	catch(e) {}

	// try get geoIP
    if (navigator.geolocation) {
        // geolocation enabled
      
      	navigator.geolocation.getCurrentPosition(
	        // success
	        function(position) {
	        	clearTimeout(defTimer);
	          	weatherDataByCoords({lat:position.coords.latitude, lon:position.coords.longitude}, clb);
	        },

	        // error
	        function(error) {
	          weatherDataByName({sity:defaultSity}, clb);
	        }
	    );
    }
    else {
      	// geolocation disabled
      	weatherDataByName({sity:defaultSity}, clb);
    }

    // set timer to load default sity
    defTimer = setTimeout(function() {
    	weatherDataByName({sity:defaultSity}, clb);
    }, maxTimeout);
}