import axios from 'axios';

export const getUserPlaylists = async (accessToken, playlistId, market = '') => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        market,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw error;
  }
};
