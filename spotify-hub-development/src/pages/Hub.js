import React, { useEffect, useState } from 'react';
import { fetchAndProcessProfileInfo, fetchFollowingStatus } from '../components/Profile/ProfileService';
import { getSavedTracks } from '../components/Tracks/TracksService';
import { getUserPlaylists } from '../components/Playlist/PlaylistService';
import { getUserTopArtists } from '../components/Artists/ArtistsService';
import { getFollowedArtistsAlbums } from '../components/Albums/AlbumsService';
import { getUserTopGenres } from '../components/Generes/GeneresService';

const HubPage = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [followingStatus, setFollowingStatus] = useState(null);
  const [savedTracks, setSavedTracks] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [followedArtistsAlbums, setFollowedArtistsAlbums] = useState(null);
  const [userTopGenres, setUserTopGenres] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        const processedData = await fetchAndProcessProfileInfo(accessToken);
        setProfileInfo(processedData);

        const status = await fetchFollowingStatus(accessToken, 'artist', ['74ASZWbe4lXaubB36ztrGX', '08td7MxkoHQkXnWAYD8d6Q']);
        setFollowingStatus(status);

        const tracks = await getSavedTracks(accessToken, 'US');
        setSavedTracks(tracks);

        const playlists = await getUserPlaylists(accessToken);
        setUserPlaylists(playlists);

        const artists = await getUserTopArtists(accessToken);
        setTopArtists(artists);

        const albums = await getFollowedArtistsAlbums(accessToken);
        setFollowedArtistsAlbums(albums);

        const topGenres = await getUserTopGenres(accessToken);
        setUserTopGenres(topGenres);
      } catch (error) {
        console.error('Error fetching and processing profile info:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <h1>Hub Page Test</h1>

      {profileInfo ? (
        <div>
          <h2>Welcome, {profileInfo.display_name}</h2>
          <p>Email: {profileInfo.email}</p>
          <p>Country: {profileInfo.country}</p>
          <p>Followers: {profileInfo.followers.total}</p>
          <p>Following Artists: {followingStatus ? 'Yes' : 'No'}</p>
          {profileInfo.images.length > 0 && (
            <p>
              Profile Image: <img src={profileInfo.images[0].url} alt="Profile" />
            </p>
          )}
        </div>
      ) : (
        <div>Loading profile information...</div>
      )}

      {savedTracks ? (
        <div>
          <h3>Your Saved Tracks:</h3>
          <ul>
            {savedTracks.items.map((item) => (
              <li key={item.track.id}>
                <div>
                  <img src={item.track.album.images[0].url} alt="Album" style={{ width: '200px' }} />
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
      ) : (
        <div>Loading saved tracks...</div>
      )}

      {userPlaylists ? (
        <div>
          <h3>Your Playlists:</h3>
          <ul>
            {userPlaylists.map((playlist) => (
              <li key={playlist.id}>
                <p>Name: {playlist.name}</p>
                <p>Owner: {playlist.owner.display_name}</p>
                <p>Total Tracks: {playlist.tracks.total}</p>
                {playlist.images.length > 0 && (
                  <img src={playlist.images[0].url} alt="Playlist Cover" style={{ width: '200px' }} />
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Loading playlists...</div>
      )}

      {topArtists ? (
        <div>
          <h3>Your Top Artists:</h3>
          <ul>
            {topArtists.map((artist) => (
              <li key={artist.id}>
                <p>Name: {artist.name}</p>
                <p>Genre: {artist.genres.join(', ')}</p>
                <p>Followers: {artist.followers.total}</p>
                <img src={artist.images[0].url} alt="Artist" style={{ width: '200px' }} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Loading your top artists...</div>
      )}

      {followedArtistsAlbums ? (
        <div>
          <h3>Albums of Artists You Follow:</h3>
          <ul>
            {followedArtistsAlbums.map((album) => (
              <li key={album.id}>
                <p>Name: {album.name}</p>
                <p>Artists: {album.artists.map((artist) => artist.name).join(', ')}</p>
                <p>Release Date: {album.release_date}</p>
                <p>Popularity: {album.popularity}</p>
                <img src={album.images[0].url} alt="Album" style={{ width: '200px' }} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Loading albums of artists you follow...</div>
      )}

      {userTopGenres ? (
        <div>
          <h3>Your Top Genres:</h3>
          <ul>
            {userTopGenres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Loading top genres...</div>
      )}
    </div>
  );
};

export default HubPage;
