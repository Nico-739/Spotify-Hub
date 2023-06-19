import axios from 'axios';

export const getSavedTracks = async (accessToken, market = '', limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        market,
        limit,
        offset,
      },
    });

    console.log('API Response:', response.data); // Log the API response

    return response.data;
  } catch (error) {
    console.error('Error fetching saved tracks:', error);
    console.log('Response data:', error.response.data); // Log the error response data
    throw error;
  }
};
