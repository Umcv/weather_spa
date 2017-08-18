import React from 'react';

import Loading from '../basic/Loading';
import ErrMsg from '../basic/ErrMsg';

export default class StatisticsPage extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {
      countList: 0,
      countSum: 0,
    };
	}

  componentDidMount() {
    this.readCountSities();
  }


  readCountSities() {
    // read local storage: list selected, cashe and current
    var sityList = [],
    storage = [],
    current = null,
    countList = 0,
    countSum = 0;

    try {
      sityList = JSON.parse(localStorage.getItem('sityList'));
      storage = JSON.parse(localStorage.getItem('weatherList'));
      current = localStorage.getItem('current');
    }
    catch(e) {}
    
    if (sityList) {
      countList = sityList.length;
    }

    if (storage) {
      for (let key in storage)
        countSum++;
    }

    if (current) {
      countSum++;
    }

    this.setState({
      countList: countList, 
      countSum: countSum,
    });
  }

	render() {
	  return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="headline first-child text-color">
              <span className="border-color">Statistic</span>
            </h2>
          </div>
        </div>
        <br />
        <div className="widgets">
            <hr />
            <h3>Count of cities in your list: {this.state.countList}</h3>
            <h3>Count of cities you have been viewing: {this.state.countSum}</h3>
        </div>     
      </div>
		);
	}
}