import React, { useEffect, useState } from 'react';
import { fetchAndProcessProfileInfo, fetchFollowingStatus } from '../components/Profile/ProfileService';
import { getSavedTracks } from '../components/Tracks/TracksService';

const HubPage = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [followingStatus, setFollowingStatus] = useState(null);
  const [savedTracks, setSavedTracks] = useState(null);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const processedData = await fetchAndProcessProfileInfo(accessToken);
        setProfileInfo(processedData);
        const status = await fetchFollowingStatus(accessToken, 'artist', ['74ASZWbe4lXaubB36ztrGX', '08td7MxkoHQkXnWAYD8d6Q']);
        setFollowingStatus(status);
        const tracks = await getSavedTracks(accessToken, 'US'); // Add a valid market code, e.g., 'US'
        setSavedTracks(tracks);
      } catch (error) {
        console.error('Error fetching and processing profile info:', error);
      }
    };    

    fetchProfileInfo();
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
                {item.track.name} by {item.track.artists.map((artist) => artist.name).join(', ')} from the album {item.album.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Loading saved tracks...</div>
      )}
    </div>
  );
};

export default HubPage;
