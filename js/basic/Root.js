import React from 'react';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Loading from './Loading';

import pageMode from './PageMode';

export default class Root extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {
      page:'', 
      start:false, 
      objH:null
    };
    this.updateState = this.updateState.bind(this);
	}

  componentDidMount() {
    var self = this;

    pageMode(function(page) {
      self.setState({page:page, start:true});
    });

    if (history.pushState) {
      var self = this;
      window.onpopstate = function(e) {
        self.updateState(e.state);
      }
    }
  }

  updateState(upd) {
    var self = this;
    pageMode(function(page) {
      self.setState({page:page, start:true});
    });
  }
  
  render() {
		return (
        <div className="wrap">
        	<div className="fcont">
        		<Header {...this.state.objH} spa={this.updateState} />
            {this.state.start ? <Content spa={this.updateState} page={this.state.page}/> : <Loading />}
          </div> 
          <Footer/>
      	</div>
		);
	}
}