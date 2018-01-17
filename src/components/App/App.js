import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);

    // make sure they are authenticated before we can use the app
    Spotify.getAccessToken();

    this.state = {
      searchResults: [],
      playlistTracks: [],
      playlistName: 'New playlist',
      searchTerm: ''
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(newTrack){
    let alreadyAdded = false;
    this.state.playlistTracks.forEach(track => {
      if(track.id === newTrack.id) alreadyAdded = true;
    });

    if(!alreadyAdded){
      this.setState({
        playlistTracks: [...this.state.playlistTracks, newTrack]
      })
    }
  }

  removeTrack(track){
    var playlist = this.state.playlistTracks;
    var index = playlist.indexOf(track)
    playlist.splice(index, 1);
    this.setState({playlistTracks: playlist });
  }

  updatePlaylistName(newName){
    this.setState({playlistName: newName});
  }

  search(term){
    Spotify.search(term).then( searchResults => {
      this.setState({
        searchResults: searchResults
      })
    })
  }

  savePlaylist(){
    let trackUris = this.state.playlistTracks.map(track => {
      return track.uri;
    });

    Spotify.savePlaylist(this.state.playlistName, trackUris).then( () => {
      this.setState({
        playlistName: 'New playlist',
        searchResults: [],
        playlistTracks: [],
      })
    });

    this.refs.searchbar.resetSearchTerm();
  }

  render() {
    return (
      <div>
        <h1>ja<span className="highlight">mm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} searchTerm={this.state.searchTerm} ref='searchbar' />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
              name={this.state.playlistName}
              onRemove={this.removeTrack}
              tracks={this.state.playlistTracks}
              onNameChange={this.updatePlaylistName}
              onPlaylistSave={this.savePlaylist}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
