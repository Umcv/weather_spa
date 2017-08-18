import axios from 'axios';
/**
	get weather in selected sity (id)
*/
export default function weatherDataById(params, clb) {
	'use strict';

	// try read from local storage
	var storage = {};
	try {
		storage = JSON.parse(localStorage.getItem('weatherList'));
	}
	catch(e) {}

	// try read from weather api
	axios.get('http://api.openweathermap.org/data/2.5/weather?id='+params.id+'&APPID=f35c6f7c0f1c52dcd9f91a595a81fd39')
		.then(function(response) {
			// write answer to local storage
			if (!storage)
				storage = {};
			let _ = response.data
			_.sname = params.sity;
			storage[params.sity] = _;
			storage[params.sity].casheTime = new Date().getTime();
			localStorage.setItem('weatherList', JSON.stringify(storage));
			clb(_);
    	})
		.catch(function (error) {
		    if (error.message == 'Request failed with status code 404') {
				clb({err: true, errMsg: 'Sity not found...'});
		    }
		    else {
		    	clb({err: true, errMsg: 'Error getting data by name...'});
		    }
		});
}