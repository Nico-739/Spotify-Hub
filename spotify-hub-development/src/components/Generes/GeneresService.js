import axios from 'axios';

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
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

export const getUserTopGenres = async () => {
  try {
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      accessToken = await refreshAccessToken();
    }

    const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        time_range: 'medium_term',
        limit: 50,
      },
    });

    const artists = response.data.items;
    const artistIds = artists.map((artist) => artist.id);

    const genreResponses = await Promise.all(
      artistIds.map((artistId) =>
        axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      )
    );

    const genres = genreResponses.flatMap((genreResponse) => genreResponse.data.genres);

    const genreCount = genres.reduce((count, genre) => {
      count[genre] = (count[genre] || 0) + 1;
      return count;
    }, {});

    const sortedGenres = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);

    return sortedGenres.map((genre) => genre[0]);
  } catch (error) {
    console.error('Error fetching user top genres:', error);
    throw error;
  }
};