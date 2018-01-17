import React from 'react';
import { Tracklist } from '../Tracklist/Tracklist';
import './Playlist.css';

export class Playlist extends React.Component {
  constructor(props){
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePlaylistSave = this.handlePlaylistSave.bind(this);
  }

  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }

  handlePlaylistSave(event){
    event.preventDefault();
    if(this.props.tracks.length === 0) return;

    this.props.onSave();
  }

  render(){
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={'New Playlist'} value={this.props.name} />
        <Tracklist tracks={this.props.tracks} onRemove={this.props.onRemove} origin='playlist' />
        <a className={"Playlist-save " + (this.props.tracks.length === 0 ? 'disabled' : '')} onClick={this.handlePlaylistSave}>SAVE TO SPOTIFY</a>
      </div>
    )
  }

}
