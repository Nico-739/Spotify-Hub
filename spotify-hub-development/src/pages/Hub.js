import React, { useEffect, useState } from 'react';
import { fetchAndProcessProfileInfo } from '../components/Profile/ProfileService';
import { getSavedTracks } from '../components/Tracks/TracksService';
import { getUserPlaylists } from '../components/Playlist/PlaylistService';
import { getUserTopArtists } from '../components/Artists/ArtistsService';
import { getUserTopTracks } from '../components/Tracks/TopTracksService';
import { getUserTopGenres } from '../components/Generes/GeneresService';

import '../components/Styles/Hub.css';

const HubPage = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [savedTracks, setSavedTracks] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [followedArtistsTracks, setFollowedArtistsTracks] = useState(null);
  const [userTopGenres, setUserTopGenres] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        const processedData = await fetchAndProcessProfileInfo(accessToken);
        setProfileInfo(processedData);

        const tracks = await getSavedTracks(accessToken, 'US');
        setSavedTracks(tracks);

        const playlists = await getUserPlaylists(accessToken);
        setUserPlaylists(playlists);

        const artists = await getUserTopArtists(accessToken);
        setTopArtists(artists);

        const followedArtistsTracks = await getUserTopTracks(accessToken);
        setFollowedArtistsTracks(followedArtistsTracks);

        const topGenres = await getUserTopGenres(accessToken);
        setUserTopGenres(topGenres);
      } catch (error) {
        console.error('Error fetching and processing profile info:', error);
      }
    };

    fetchProfileData();
  }, []);

  const ProfileSection = () => {
    return (
      <div className="CardContainer">
        <div className="ProfileSection">
          <h2>Welcome, {profileInfo.display_name}</h2>
          <p>Email: {profileInfo.email}</p>
          <p>Country: {profileInfo.country}</p>
          <p>Followers: {profileInfo.followers.total}</p>
          {profileInfo.images && profileInfo.images.length > 0 && (
            <p>
              Profile Image: <img src={profileInfo.images[0].url} alt="Profile" />
            </p>
          )}
        </div>
      </div>
    );
  };

  const SavedTracksSection = () => {
    return (
      <div className="CardContainer">
        <div className="SavedTracksSection">
          <h3>Your Saved Tracks:</h3>
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
                  <p>
                    {item.track.artists.map((artist) => artist.name).join(', ')} - {item.track.album.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const UserPlaylistsSection = () => {
    return (
      <div className="CardContainer">
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
      </div>
    );
  };

  const TopArtistsSection = () => {
    return (
      <div className="CardContainer">
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
      </div>
    );
  };

  const UserTopTracksSection = () => {
    return (
      <div className="CardContainer">
        <div className="UserTopTracksSection">
          <h3>Your Top Tracks:</h3>
          <ul>
            {followedArtistsTracks.map((track) => (
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
      </div>
    );
  };

  const UserTopGenresSection = () => {
    return (
      <div className="CardContainer">
        <div className="UserTopGenresSection">
          <h3>Your Top Genres:</h3>
          <ul>
            {userTopGenres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div>
      {profileInfo ? <ProfileSection /> : <div>Loading profile information...</div>}
      {savedTracks ? <SavedTracksSection /> : <div>Loading saved tracks...</div>}
      {userPlaylists ? <UserPlaylistsSection /> : <div>Loading playlists...</div>}
      {topArtists ? <TopArtistsSection /> : <div>Loading your top artists...</div>}
      {followedArtistsTracks ? <UserTopTracksSection /> : <div>Loading your top tracks...</div>}
      {userTopGenres ? <UserTopGenresSection /> : <div>Loading top genres...</div>}
    </div>
  );
};

export default HubPage;
