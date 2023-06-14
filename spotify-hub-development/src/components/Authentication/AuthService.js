import axios from 'axios';

const clientId = '9927b119c4a7420ca10a6a881a955e6f';
const clientSecret = '8776f50ee48b485780b87bce3bffca19';
const redirectUri = 'http://localhost:3000';

const scopes = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
];

export const login = () => {
  const authorizeURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}`;
  window.location.href = authorizeURL;
};

export const handleRedirect = async () => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');

  if (code) {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      window.location.href = '/hub';
      return;
    }

    try {
      const { access_token, refresh_token } = await exchangeCodeForTokens(code);

      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);

      // Reload the page to update the authentication status
      window.location.reload();
    } catch (error) {
      console.error('Error exchanging authorization code for tokens:', error);
      console.log('Response data:', error.response.data);
    }
  } else {
    console.error('No authorization code found in the URL.');
  }
};

const exchangeCodeForTokens = async (code) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error exchanging authorization code for tokens:', error);
    throw error;
  }
};

// eslint-disable-next-line
export default {
  login,
  handleRedirect,
};
