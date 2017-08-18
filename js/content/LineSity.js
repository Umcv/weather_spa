import React from 'react';
/**
 * sity in user list
 */
export default class CurrentSearch extends React.Component {
	constructor(props) {
  	super(props);
    this.addToListClick = this.addToListClick.bind(this);
    this.removeFromListClick = this.removeFromListClick.bind(this);
    this.lineClick = this.lineClick.bind(this);
	}

  // add new sity to list
  addToListClick(e) {
    // write to local storage list
    var storage = [];
    try {
      storage = JSON.parse(localStorage.getItem('sityList'));
    }
    catch(e) {}
    if (!storage) storage = [];
    storage.push(this.props.sname);
    localStorage.setItem('sityList', JSON.stringify(storage));

    // update list view
    this.props.addToList();
  }

  // remove existing sity from list
  removeFromListClick(e) {
    // remove from storage
    var storage = [];
    try {
      storage = JSON.parse(localStorage.getItem('sityList'));
    }
    catch(e) {}
    let start = -1;
    for (var i = 0; i < storage.length; i++) {
      if (storage[i] === this.props.sname) start = i;
    }
    if (start !== -1) 
      storage.splice(start, 1);
    localStorage.setItem('sityList', JSON.stringify(storage));

    // update list view
    this.props.remFromList(this.props.sname);
  }

  // go to sity page
  lineClick(e) {
    e.preventDefault();
    history.pushState('', '', e.currentTarget.href);
    this.props.spa();
  }

	render() {
	  return (
      <div className="row anim_fadein">
        <div className="col-sm-12">
          <div className="tab-pane active" id="forecast-list">
            <div id="forecast_list_ul">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <img src={'http://openweathermap.org/img/w/'+this.props.weather[0].icon+'.png'} />
                    </td>
                    <td style={{width:'70%'}}>
                      <a href={'/sity/'+this.props.sname} onClick={this.lineClick} >
                        <b>{this.props.name+', '+this.props.sys.country} </b> 
                        <img src={'http://openweathermap.org/images/flags/'+this.props.sys.country.toLowerCase()+'.png'} />
                        <b><i> {this.props.weather[0].main}</i></b>
                        <p><span className="badge badge-info">{Math.round((this.props.main.temp-272.15)*10)/10}°С </span> wind {this.props.wind.speed}m/s. clouds {this.props.main.humidity}%, {this.props.main.pressure}hpa</p>
                        <p>Geo coords[{this.props.coord.lat}, {this.props.coord.lon}]</p>
                      </a>
                    </td>
                    <td style={{width:'20%'}}>
                      <br />
                      {this.props.btnAdd && <button className="btn btn-orange" onClick={this.addToListClick}>Add to list</button>}
                      {this.props.btnRem && <button className="btn btn-red" onClick={this.removeFromListClick}>Remove from list</button>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
		);
	}
}