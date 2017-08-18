import axios from 'axios';
/**
	get weather by coords
*/
export default function weatherDataByCoords(params, clb) {
	'use strict';
	
  	// read from weather api
	axios.get('http://api.openweathermap.org/data/2.5/weather?lat='+params.lat+'&lon='+params.lon+'&APPID=f35c6f7c0f1c52dcd9f91a595a81fd39')
		.then(function(response) {
			// write answer to local storage
			let _sav = response.data;
			_sav.casheTime = new Date().getTime();
			localStorage.setItem('current', JSON.stringify(_sav));
			clb(response.data);
    	})
		.catch(function (error) {
		    clb({err: true, errMsg: 'Error getting data by coords...'});
		});
}