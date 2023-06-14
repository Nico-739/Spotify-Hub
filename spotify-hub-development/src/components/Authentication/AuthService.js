import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=9927b119c4a7420ca10a6a881a955e6f&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&state=YOUR_STATE`;

export const login = () => {
  window.location = AUTH_URL;
};

export const handleRedirect = async () => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');

  if (code) {
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: 'http://localhost:3000',
          client_id: '9927b119c4a7420ca10a6a881a955e6f',
          client_secret: '8776f50ee48b485780b87bce3bffca19',
        },
      });

      const accessToken = response.data.access_token;
      spotifyApi.setAccessToken(accessToken);
    } catch (error) {
      console.error('Error exchanging authorization code for access token:', error);
    }
  }
};
