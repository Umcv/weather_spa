import React from 'react';

export default class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.backClick = this.backClick.bind(this);
  }

  backClick(e) {
    e.preventDefault();
    history.pushState('', '', '/');
    this.props.spa();
  }
  
	render() {
	  return (
      <div className="container">
        <div className="row">
          <div className="text-center">
            <img alt="Not found" src="/img/404.jpg" height="201" width="300" />
            <br />
            <button className="btn btn-gray" onClick={this.backClick}>Back to home page</button>
          </div>
        </div>
      </div>
		);
	}
}