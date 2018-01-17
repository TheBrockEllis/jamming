import React from 'react';
import './Tracklist.css';
import { Track } from '../Track/Track';

export class Tracklist extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => {
            return <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} origin={this.props.origin} />
          })
        }
      </div>
    )
  }
}
