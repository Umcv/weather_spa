import React from 'react';
import StartPage from './StartPage';
import ListPage from '../content/ListPage';
import StatisticsPage from '../content/StatisticsPage';
import NotFoundPage from './NotFoundPage';

export default class Content extends React.Component {
  	constructor(props) {
    	super(props);
  	}

  	render() {
		return (
    	<div className="container">
    		{(this.props.page === '' || this.props.page === 'sity') && <StartPage page={this.props.page} spa={this.props.spa} />}
        {this.props.page === 'list' && <ListPage spa={this.props.spa} />}
        {this.props.page === 'statistics' && <StatisticsPage spa={this.props.spa} />}
        {this.props.page === '404' && <NotFoundPage spa={this.props.spa} />}
    	</div>
		);
	}
}