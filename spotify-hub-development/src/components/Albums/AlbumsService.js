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

export const getFollowedArtistsAlbums = async () => {
  try {
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      accessToken = await refreshAccessToken();
    }

    const response = await axios.get('https://api.spotify.com/v1/me/following?type=artist&limit=50', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const artistIds = response.data.artists.items.map((artist) => artist.id);

    const albumResponses = await Promise.all(
      artistIds.map((artistId) =>
        axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            include_groups: 'album',
            limit: 10, // Adjust the limit to fetch more albums if needed
          },
        })
      )
    );

    const albums = albumResponses.flatMap((albumResponse) => albumResponse.data.items);

    // Fetch additional details for each album
    const detailedAlbums = await Promise.all(
      albums.map(async (album) => {
        const albumResponse = await axios.get(`https://api.spotify.com/v1/albums/${album.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return albumResponse.data;
      })
    );

    // Sort albums by popularity in descending order
    const sortedAlbums = detailedAlbums.sort((a, b) => b.popularity - a.popularity);

    // Group albums by artist
    const albumsByArtist = {};
    sortedAlbums.forEach((album) => {
      const artistId = album.artists[0].id;
      if (!albumsByArtist[artistId]) {
        albumsByArtist[artistId] = [];
      }
      albumsByArtist[artistId].push(album);
    });

    // Filter and keep only the three most popular albums of each artist
    const filteredAlbums = Object.values(albumsByArtist).flatMap((artistAlbums) =>
      artistAlbums.slice(0, 3)
    );

    return filteredAlbums;
  } catch (error) {
    console.error('Error fetching followed artists albums:', error);
    throw error;
  }
};
