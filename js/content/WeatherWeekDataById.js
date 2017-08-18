import axios from 'axios';
/**
	get weather in selected sity (forecast on 5 days)
*/
export default function weatherWeekDataById(params, clb) {
	'use strict';

	//
	const maxStorageTime = 3600000;

	// try read from local storage
	var storage = {};
	try {
		storage = JSON.parse(localStorage.getItem('historyList'));
		
		if (storage[params.id]) {
			let dateInStorage = storage[params.id].casheTime;
			let now = new Date().getTime();
			if (now - dateInStorage < maxStorageTime) {
				clb(storage[params.id]);
				return;
			}
		}
	}
	catch(e) {}

	// try read from weather api
	/* let end = Math.round(new Date().getTime()/1000);
	let start = end - 604800;
	axios.get('http://api.openweathermap.org/data/2.5/history/city?id='+params.id+'&type=hour&start='+start+'&end='+end+'&APPID=f35c6f7c0f1c52dcd9f91a595a81fd39')*/
	axios.get('http://api.openweathermap.org/data/2.5/forecast?id='+params.id+'&APPID=f35c6f7c0f1c52dcd9f91a595a81fd39')
		.then(function(response) {
			// write answer to local storage
			if (!storage)
				storage = {};
			let obj = response.data;
			// array of labels (datetime in timestamp)
			let listLabel = [];
			// array of values, °C
			let listValue = [];
			// average temperature, °C
			let middle = 0;
			// 
			let cTemp = 0;

		    if (obj.list) {
		        for (let i = 0; i < obj.list.length; i++) {
		          	listLabel.push(obj.list[i].dt);
		          	cTemp = Math.round((obj.list[i].main.temp-272.15)*10)/10;
		          	listValue.push(cTemp);
		          	middle += cTemp;
		        }
		        middle = Math.round(middle/obj.list.length);
		    }
		    
			let _ = {listLabel:listLabel, listValue:listValue, middle:middle, casheTime: new Date().getTime()};
			storage[params.id] = _;
			localStorage.setItem('historyList', JSON.stringify(storage));
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