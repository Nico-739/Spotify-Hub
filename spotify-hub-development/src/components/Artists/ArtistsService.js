import axios from 'axios';

const refreshAccessToken = async (refreshToken) => {
  const clientId = '9927b119c4a7420ca10a6a881a955e6f';
  const clientSecret = '8776f50ee48b485780b87bce3bffca19';

  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = response.data;
    localStorage.setItem('accessToken', access_token);

    return access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

export const getUserArtists = async () => {
  try {
    let accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken) {
      accessToken = await refreshAccessToken(refreshToken);
    }

    const response = await axios.get('https://api.spotify.com/v1/me/following?type=artist', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.artists.items;
  } catch (error) {
    console.error('Error fetching user artists:', error);
    throw error;
  }
};
