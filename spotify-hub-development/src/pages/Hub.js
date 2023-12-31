import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';
import { fetchAndProcessProfileInfo } from '../components/Profile/ProfileService';
import { getSavedTracks } from '../components/Tracks/TracksService';
import { getUserPlaylists } from '../components/Playlist/PlaylistService';
import { getUserTopArtists } from '../components/Artists/ArtistsService';
import { getUserTopTracks } from '../components/Tracks/TopTracksService';
import { getUserTopGenres } from '../components/Generes/GeneresService';
import { changeState, changeTrack, refreshAccessToken } from '../components/Player/PlayerService';
import {CurrentTrack, CurrentImg} from '../components/Tracks/CurrentTrack';
import '../components/Styles/Hub.css';

const HubPage = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [savedTracks, setSavedTracks] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [userTopGenres, setUserTopGenres] = useState(null);
  const [setPlayerState] = useState(false);
  const [setPlaying] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          await refreshAccessToken();
        }

        const processedData = await fetchAndProcessProfileInfo(accessToken);
        setProfileInfo(processedData);

        const tracks = await getSavedTracks(accessToken, 'US');
        setSavedTracks(tracks);

        const playlists = await getUserPlaylists(accessToken);
        setUserPlaylists(playlists);

        const artists = await getUserTopArtists(accessToken);
        setTopArtists(artists);

        const topTracks = await getUserTopTracks(accessToken);
        setTopTracks(topTracks);

        const topGenres = await getUserTopGenres(accessToken);
        setUserTopGenres(topGenres);
      } catch (error) {
        console.error('Error fetching and processing profile info:', error);
      }
    };

    fetchProfileData();
    const interval = setInterval(fetchProfileData, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data !== "") {
          const currentPlaying = {
            id: response.data.item.id,
            name: response.data.item.name,
            artists: response.data.item.artists.map((artist) => artist.name),
            image: response.data.item.album.images[2].url,
          };

          setPlaying(currentPlaying);
        } else {
          setPlaying(null);
        }
      } catch (error) {
        console.error("Error updating current track:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [setPlaying]);

  const ProfileSection = () => {
    return (
      <div className="ProfileSection">
        <div className="profile-info">
          <h3>Welcome, {profileInfo.display_name}</h3>
          <p>Email: {profileInfo.email}</p>
          <p>Country: {profileInfo.country}</p>
          <p>Followers: {profileInfo.followers.total}</p>
        </div>
        {profileInfo.images && profileInfo.images.length > 0 && (
          <div className="profile-image">
            <img src={profileInfo.images[0].url} alt="Profile" />
          </div>
        )}
      </div>
    );
  };

  const SavedTracksSection = () => {
    return (
      <div className="SavedTracksSection">
        <h3>Liked Songs:</h3>
        <ul>
          {savedTracks.items.map((item) => (
            <li key={item.track.id}>
              <div>
                {item.track.album.images && item.track.album.images.length > 0 && (
                  <img src={item.track.album.images[0].url} alt="Album" />
                )}
              </div>
              <div>
                <p>{item.track.name}</p>
                <p>{item.track.artists.map((artist) => artist.name).join(', ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const UserPlaylistsSection = () => {
    return (
      <div className="UserPlaylistsSection">
        <h3>Your Playlists:</h3>
        <ul>
          {userPlaylists.map((playlist) => (
            <li key={playlist.id}>
              <p>Name: {playlist.name}</p>
              <p>Owner: {playlist.owner.display_name}</p>
              <p>Total Tracks: {playlist.tracks.total}</p>
              {playlist.images && playlist.images.length > 0 && (
                <img src={playlist.images[0].url} alt="Playlist Cover" />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const TopArtistsSection = () => {
    return (
      <div className="TopArtistsSection">
        <h3>Your Top Artists:</h3>
        <ul>
          {topArtists.map((artist) => (
            <li key={artist.id}>
              <p>Name: {artist.name}</p>
              <p>Genre: {artist.genres.join(', ')}</p>
              {artist.images && artist.images.length > 0 && (
                <img src={artist.images[0].url} alt="Artist" />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const UserTopTracksSection = () => {
    return (
      <div className="UserTopTracksSection">
        <h3>Your Top Tracks:</h3>
        <ul>
          {topTracks.map((track) => (
            <li key={track.id}>
              <p>Name: {track.name}</p>
              <p>Artists: {track.artists.map((artist) => artist.name).join(', ')}</p>
              <p>Release Date: {track.album.release_date}</p>
              <p>Popularity: {track.popularity}</p>
              {track.album.images && track.album.images.length > 0 && (
                <img src={track.album.images[0].url} alt="Album" />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const UserTopGenresSection = () => {
    return (
      <div className="UserTopGenresSection">
        <h3>Your Top Genres:</h3>
        <ul>
          {userTopGenres.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
    );
  };

  const CurrentTrackSection = () => {
    const playerState = true;
    const token = localStorage.getItem('accessToken');

    const handlePlayPause = async () => {
      try {
        await changeState(playerState, token, setPlayerState);
      } catch (error) {
        console.error('Error changing player state:', error);
      }
    };

    const handleChangeTrack = async (type) => {
      try {
        await changeTrack(type, token, setPlaying);
      } catch (error) {
        console.error('Error changing track:', error);
      }
    };

    return (
      <div className="CurrentTrackSection">
        <div className='Info'>
        <h3>Currently Playing:</h3>
        <CurrentTrack className="trackInfo" />
        </div>
          <div className='ButtonContainer'>
            <button className="playPauseButton" onClick={handlePlayPause}>
              {playerState ? <FaPause /> : <FaPlay />}
            </button>
            <button className="nextTrackButton" onClick={() => handleChangeTrack('next')}>
              <FaStepForward />
            </button>
            <button className="previousTrackButton" onClick={() => handleChangeTrack('previous')}>
              <FaStepBackward />
            </button>
          </div>
      </div>
    );
  };

  const AlbumImgSection = () => {
    return (
      <div className="current-img-container">
        <CurrentImg/>
      </div>
    );
  };
  
  return (
    <div>
      {profileInfo ? <ProfileSection /> : <div>Loading profile information...</div>}
      {savedTracks ? <SavedTracksSection /> : <div>Loading saved tracks...</div>}
      {userPlaylists ? <UserPlaylistsSection /> : <div>Loading playlists...</div>}
      {topArtists ? <TopArtistsSection /> : <div>Loading your top artists...</div>}
      {topTracks ? <UserTopTracksSection /> : <div>Loading your top tracks...</div>}
      {userTopGenres ? <UserTopGenresSection /> : <div>Loading top genres...</div>}
      {profileInfo ? <CurrentTrackSection /> :  <div>Loading current tracks...</div>} 
      {profileInfo ? <AlbumImgSection /> :  <div>Loading current Img...</div>} 
  </div>
  );
};

export default HubPage;
