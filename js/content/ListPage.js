import React from 'react';

import Loading from '../basic/Loading';
import ErrMsg from '../basic/ErrMsg';
import SearchPanel from './SearchPanel';
import LineSity from './LineSity';

import weatherDataById from './weatherDataById';
import weatherDataByName from './WeatherDataByName';

export default class ListPage extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {
      s: null,
      list: null,
      err: false,
      empty: false,
      loading: false,
      btn_add: true,
    };
    this.loadData = this.loadData.bind(this);
    this.addToList = this.addToList.bind(this);
    this.remFromList = this.remFromList.bind(this);
	}

  componentDidMount() {
    this.createList();
  }

  // update list - added new item
  addToList() {
    this.state = {
      s: null,
    };
    this.createList();
  }

  // update list - remove item
  remFromList(name) {
    if (this.state.s && this.state.s.sname === name) {
      this.setState({
          btn_add: true,
        });
    }
    this.createList();
  }

  createList() {
    // read local storage list
    var sityList = [],
    storage = [],
    list = [];
    try {
      sityList = JSON.parse(localStorage.getItem('sityList'));
      storage = JSON.parse(localStorage.getItem('weatherList'));
    }
    catch(e) {}
    
    if (sityList) {
      for (let i = 0; i < sityList.length; i++) {
        if (storage[sityList[i]]) {
          list.push(storage[sityList[i]]);
        }
      }
    }

    if (list.length > 0) {
      this.setState({
        list: list, 
        empty: false,
      });

      // update weather in sities from list
      const maxStorageTime = 600000;
      let now = new Date().getTime();
      var self = this;
      
      for (let i = 0; i < list.length; i++) {
        let dateInStorage = list[i].casheTime;
        if (now - dateInStorage < maxStorageTime) {
          weatherDataById({id:list[i].id, sity:list[i].sname}, function(obj) {
            if (obj.err) return;
            let _list = self.state.list;
            _list[i] = obj;
            self.setState({
              list: _list, 
            });
          });
        }
      }
    }
    else {
      this.setState({
        empty: true, 
        list: null,
      });
    }
  }

  // search new sity
  loadData(sityName) {
    var self = this;
    this.setState({
      s: null, 
      err: false,
      loading: true,
    });
    sityName = encodeURIComponent(sityName);
    if (sityName) {
      weatherDataByName({sity:sityName}, function(obj) {
        var list = self.state.list;
        var btn_add = true;
        if (list) {
          for (var i = 0; i < list.length; i++) {
            if (obj.sname == list[i].sname) {
              btn_add = false;
              break;
            }
          }
        }
        console.info(obj);
        self.setState({
          s: obj, 
          err: obj.err,
          loading: false,
          btn_add: btn_add,
        });
      });
    }
  }

	render() {
	  return (
      <div className="container">
        <div className="row">
          <SearchPanel spa={this.props.spa} mode={'add_to_list'} loadData={this.loadData} />
        </div>
        <br />
        {this.state.err ? <ErrMsg text={this.state.s.errMsg} /> : 
          (this.state.s && <LineSity {...this.state.s} addToList={this.addToList} btnAdd={this.state.btn_add} spa={this.props.spa} />)}
        {this.state.loading && <Loading />}
        <br />
        <h3>List of your cities</h3>
        <div className="widgets">
            <hr />
            {this.state.empty ? <ErrMsg text={'Your list of cities is empty.'} /> : 
              (this.state.list ? this.state.list.map((item) => <LineSity key={item.id} {...item} btnRem={true} remFromList={this.remFromList} spa={this.props.spa} />) : <Loading />)}
        </div>     
      </div>
		);
	}
}