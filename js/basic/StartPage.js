import React from 'react';

import WeatherWidget from '../content/WeatherWidget';
import Loading from './Loading';
import ErrMsg from './ErrMsg';
import SearchPanel from '../content/SearchPanel';

import startWeatherData from '../content/StartWeatherData';
import weatherDataByName from '../content/WeatherDataByName';

export default class StartPage extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {
      w: null,
      err: false,
    };
	}

  componentDidMount() {
    this.loadData(this.props.page);
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps.page);
  }

  // search sity by name
  loadData(page) {
    var self = this;
    self.setState({
      w: null, 
      err: false,
    });
    setTimeout(function() {
      if (page === 'sity') {
        let sityName = location.pathname.split('/')[2];
        document.title = "Weather in"+decodeURIComponent(sityName);
        if (sityName) {
          weatherDataByName({sity:sityName}, function(obj) {
            self.setState({
              w: obj, 
              err: !!obj.err,
            });
          });
          return;
        }
      }
      
      document.title = "Weather app";
      startWeatherData(function(obj) {
        self.setState({
          w: obj, 
          err: !!obj.err,
        });
      });
    }, 100);
  }

	render() {
	  return (
      <div className="container">
        <div className="row">
          <SearchPanel spa={this.props.spa} />
        </div>
        <br />
        <div className="widgets">
            <hr />
            {this.state.err ? <ErrMsg text={this.state.w.errMsg} /> : 
              (this.state.w ? <WeatherWidget {...this.state.w} /> : <Loading />)}
        </div>     
      </div>
		);
	}
}