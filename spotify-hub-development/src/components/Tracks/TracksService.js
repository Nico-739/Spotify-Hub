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

    const tracks = response.data.items;
    const trackIds = tracks.map((track) => track.track.id);

    // Fetch album information for all tracks in parallel
    const albumResponses = await Promise.all(
      trackIds.map((trackId) =>
        axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      )
    );

    const albums = albumResponses.map((albumResponse) => albumResponse.data.album);

    // Merge album information with the tracks
    const tracksWithAlbums = tracks.map((track, index) => ({
      ...track,
      album: albums[index],
    }));

    return {
      ...response.data,
      items: tracksWithAlbums,
    };
  } catch (error) {
    console.error('Error fetching saved tracks:', error);
    throw error;
  }
};
