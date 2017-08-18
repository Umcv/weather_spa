import React from 'react';
/**
 * panel to serch sity by name
 * 
 */
export default class SearchPanel extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {
      sity:'',
    };
    this.searchClick = this.searchClick.bind(this);
    this.sityChange = this.sityChange.bind(this);
	}

  sityChange(e) {
    let val = e.target.value;
    this.setState({sity:val});
    if (e.keyCode === 13) this.searchClick(e);
  }

  searchClick(e) {
    e.preventDefault();
    if (this.props.mode === 'add_to_list') {
      // on page list add sity without update URL
      this.props.loadData(this.state.sity.toLowerCase());
    }
    else {
      // on home page or page another sity
      history.pushState('', '', '/sity/'+encodeURIComponent(this.state.sity.toLowerCase()));
      this.props.spa();
    }
  }

	render() {
	  return (
      <div className="col-sm-12">
        <br /> 
        <form className="form-inline text-center first-child" role="form">
            <div className="form-group">
                <label className="sr-only" htmlFor="help-search">Search</label>
                <input className="form-control border-color col-sm-12" placeholder="Your city name" value={this.state.sity} onChange={this.sityChange} />
            </div>
          <button type="submit" className="btn btn-orange" onClick={this.searchClick}>Search</button>
        </form>
      </div>
		);
	}
}