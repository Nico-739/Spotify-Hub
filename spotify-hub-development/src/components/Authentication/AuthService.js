import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=9927b119c4a7420ca10a6a881a955e6f&response_type=token&redirect_uri=http://localhost:3000/&scope=comma_separated_scopes`;

export const handleLogin = () => {
    window.location.href = AUTH_URL;
 };

export const handleRedirect = () => {
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get('access_token');
    if (accessToken) {
        spotifyApi.setAccessToken(accessToken);
    } 
};