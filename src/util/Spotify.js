var accessToken = '';
var expiresIn = 0;

const authorizeUrl = 'https://accounts.spotify.com/authorize';
const clientId = 'b42115064b734f238049cfe51eb09f0e';
const responseType = 'token';
const redirectUri = 'http://brocksjam.surge.sh';
// const redirectUri = 'http://localhost:3000';

const Spotify = {

  getAccessToken: function(){
    let currentHref = window.location.href;

    if(accessToken){
      console.log("Already have an access token");
      return accessToken;
    } else if(currentHref.match(/access_token=([^&]*)/) || currentHref.match(/expires_in=([^&]*)/) ){
      console.log("Saving token from URL");
      accessToken = currentHref.match(/access_token=([^&]*)/)[1];
      expiresIn = currentHref.match(/expires_in=([^&]*)/)[1];

      console.log(accessToken, expiresIn);

      // set the timeout to clear the token
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      console.log("Sending user to spotify to auth");
      let url = `${authorizeUrl}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=playlist-modify-public`;
      window.location = url;
    }
  },

  search: function(term){
    let url = `https://api.spotify.com/v1/search?type=track&q=${term}`;

    return fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).catch(error => {
      console.log("Error: ", error);
    }).then(jsonResponse => {

      if(!jsonResponse) return [];

      return jsonResponse.tracks.items.map( (song, index) => {
        return {
          id: index,
          name: song.name,
          artist: song.artists[0].name,
          album: song.album.name,
          uri: song.uri
        }
      });

    });
  },

  savePlaylist: async function(name, tracks){
    if(!name || !tracks) return;

    let playlistData = JSON.stringify({
      name: name,
    });

    let trackData = JSON.stringify({
      uris: tracks
    })

    let headers = { Authorization: `Bearer ${accessToken}` };

    let userId = await fetch('https://api.spotify.com/v1/me', { headers: headers }).then( response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse.id;
    });

    console.log(`Got User ID ${userId}`);

    headers['Content-type'] = 'application/json';

    let playlistId = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      body: playlistData,
      headers: headers
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      console.log("PLAYLIST CREATED");
      console.log(jsonResponse);
      return jsonResponse.id;
    });

    console.log(`Got Playlist ID ${playlistId}`);

    console.log("About to post some tracks, yo");
    console.log(trackData);

    fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      method: 'POST',
      body: trackData,
      headers: headers
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      console.log("POSTED TRACKS TO PLAYLIST");
      console.log(jsonResponse);
    });

  }

}

export default Spotify;
