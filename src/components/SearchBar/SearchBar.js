import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      term: ''
    }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(event){
    this.setState({term: event.target.value});
  }

  resetSearchTerm(){
    this.setState({term: ''});
  }

  search(){
    this.props.onSearch(this.state.term);
  }

  render(){
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" value={this.state.term} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    )
  }
}
