import React, { useEffect, useState } from 'react';
import { fetchAndProcessProfileInfo, fetchFollowingStatus } from '../components/Profile/ProfileService';
import { getSavedTracks } from '../components/Tracks/TracksService';

const HubPage = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [followingStatus, setFollowingStatus] = useState(null);
  const [savedTracks, setSavedTracks] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        const processedProfileInfo = await fetchAndProcessProfileInfo(accessToken);
        setProfileInfo(processedProfileInfo);

        const followingStatus = await fetchFollowingStatus(accessToken, 'artist', ['74ASZWbe4lXaubB36ztrGX', '08td7MxkoHQkXnWAYD8d6Q']);
        setFollowingStatus(followingStatus);

        const savedTracks = await getSavedTracks(accessToken, 'US');
        setSavedTracks(savedTracks);
      } catch (error) {
        console.error('Error fetching and processing profile info:', error);
      }
    };

    fetchProfileData();
  }, []);

  const renderProfileInfo = () => {
    if (!profileInfo) {
      return <div>Loading profile information...</div>;
    }

    const { display_name, email, country, followers, images } = profileInfo;

    return (
      <div>
        <h2>Welcome, {display_name}</h2>
        <p>Email: {email}</p>
        <p>Country: {country}</p>
        <p>Followers: {followers.total}</p>
        <p>Following Artists: {followingStatus ? 'Yes' : 'No'}</p>
        {images.length > 0 && (
          <p>
            Profile Image: <img src={images[0].url} alt="Profile" />
          </p>
        )}
      </div>
    );
  };

  const renderSavedTracks = () => {
    if (!savedTracks) {
      return <div>Loading saved tracks...</div>;
    }

    return (
      <div>
        <h3>Your Saved Tracks:</h3>
        <ul>
          {savedTracks.items.map((item) => (
            <li key={item.track.id}>
              <div>
                <img src={item.track.album.images[0].url} alt="Album" />
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
    );
  };

  return (
    <div>
      <h1>Hub Page Test</h1>
      {renderProfileInfo()}
      {renderSavedTracks()}
    </div>
  );
};

export default HubPage;
