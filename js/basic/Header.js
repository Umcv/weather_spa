import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.menuClick = this.menuClick.bind(this);
  }

  menuClick(e) {
    e.preventDefault();
    history.pushState('', '', e.currentTarget.href);
    this.props.spa();
  }

	render() {
	  return (
      <nav id="w0" className="navbar-inverse navbar-fixed-top navbar" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/" onClick={this.menuClick}>Weather test SPA</a>
          </div>
          <div id="w0-collapse" className="collapse navbar-collapse">
            <ul id="w1" className="navbar-nav navbar-right nav">
              <li>
                <a href="/list" onClick={this.menuClick}>List of cities</a>
              </li>
              <li>
                <a href="/statistics" onClick={this.menuClick}>Statistics</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
		);
	}
}
