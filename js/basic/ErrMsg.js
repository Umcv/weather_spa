import React from 'react';

export default class ErrMsg extends React.Component {

  	render() {
		return (
	      	<div className="isError">{this.props.text ? this.props.text : 'Error...'}</div>
		);
	}
}