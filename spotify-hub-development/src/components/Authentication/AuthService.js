import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=9927b119c4a7420ca10a6a881a955e6f&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&state=YOUR_STATE`;

export const handleLogin = () => {
    window.location.href = AUTH_URL;
 };

export const handleRedirect = () => {
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get('access_token');
    if (accessToken) {
        spotifyApi.setAccessToken(accessToken);
        window.location.href = '/hub';
    } 
};