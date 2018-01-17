import React from 'react';
import './SearchResults.css';
import { Tracklist } from '../Tracklist/Tracklist';

export class SearchResults extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <Tracklist tracks={this.props.searchResults} onAdd={this.props.onAdd} origin='searchresult' />
      </div>
    )
  }
}
