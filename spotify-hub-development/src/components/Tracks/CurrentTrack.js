import React, { useState, useEffect } from 'react';
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
    console.log('Refreshing access token...');
    const response = await axios.post('https://accounts.spotify.com/api/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = response.data;
    localStorage.setItem('accessToken', access_token);

    console.log('Access token refreshed:', access_token);
    return access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

export const getCurrentTrackInfo = async () => {
  try {
    let accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken) {
      console.log('Access token not found. Refreshing access token...');
      accessToken = await refreshAccessToken(refreshToken);
      console.log('New access token:', accessToken);
    }

    console.log('Fetching current track...');
    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data !== '') {
      const currentPlaying = {
        id: response.data.item.id,
        name: response.data.item.name,
        artist: response.data.item.artists.map((artist) => artist.name).join(', '),
        album: response.data.item.album.name,
        coverUrl: response.data.item.album.images[0].url,
      };
      console.log('Current track fetched:', currentPlaying);
      return currentPlaying;
    } else {
      console.log('No current track playing.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching current track:', error);
    throw error;
  }
};

const CurrentTrack = () => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const track = await getCurrentTrackInfo();
        setCurrentTrack(track);
      } catch (error) {
        console.error('Error fetching current track:', error);
      }
    };

    fetchCurrentTrack();
  }, []);

  if (!currentTrack) {
    return <div>Loading current track...</div>;
  }

  return (
    <div>
      <p>Name: {currentTrack.name}</p>
      <p>Artist: {currentTrack.artist}</p>
      <p>Album: {currentTrack.album}</p>
      <img src={currentTrack.coverUrl} alt="Album Cover" />
    </div>
  );
};

const CurrentImg = () => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const track = await getCurrentTrackInfo();
        setCurrentTrack(track);
      } catch (error) {
        console.error('Error fetching current track:', error);
      }
    };

    fetchCurrentTrack();
  }, []);

  if (!currentTrack) {
    return <div>Loading current track...</div>;
  }

  return (
    <div>
      <img src={currentTrack.coverUrl} alt="Album Cover" />
    </div>
  );
};

export { CurrentTrack, CurrentImg };
