import React, { useEffect, useState } from 'react';
import { fetchAndProcessProfileInfo } from '../components/Profile/ProfileService';

const HubPage = () => {
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const processedData = await fetchAndProcessProfileInfo(accessToken);
        setProfileInfo(processedData);
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
          <h2>Welcome, {profileInfo.display_name}!</h2>
          <p>Email: {profileInfo.email}</p>
          <p>Country: {profileInfo.country}</p>
          <p>Followers: {profileInfo.followers.total}</p>
          {profileInfo.images.length > 0 && (
            <p>
              Profile Image: <img src={profileInfo.images[0].url} alt="Profile" />
            </p>
          )}
        </div>
      ) : (
        <div>Loading profile information...</div>
      )}
    </div>
  );
};

export default HubPage;
