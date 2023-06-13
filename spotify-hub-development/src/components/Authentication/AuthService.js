import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=9927b119c4a7420ca10a6a881a955e6f&response_type=token&redirect_uri=http://localhost:3000/&scope=comma_separated_scopes`;

export const login = () => {
    window.location = AUTH_URL;
  };

export const handleRedirect = () => {
    const { access_token } = getUrlParams(window.location.hash);
    if(access_token) {
        spotifyApi.setAccessToken(access_token);
    }
};

const getUrlParams = (hash) => {
    const params = {};
    const hashParams = hash.slice(1).split('&');
    for (let param of hashParams) {
        const [key, value] = param.split('=');
        params[key] = value;
    }
    return params;
};