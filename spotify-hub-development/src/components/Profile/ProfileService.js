import axios from 'axios';

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    console.error('Refresh token not found.');
    return null;
  }

  const clientId = '9927b119c4a7420ca10a6a881a955e6f';
  const clientSecret = '8776f50ee48b485780b87bce3bffca19';

  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, expires_in } = response.data;

    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('tokenExpiry', new Date().getTime() + expires_in * 1000);

    return access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

const getProfileInfo = async (accessToken) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      console.error('Access token expired. Refreshing token...');
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          return getProfileInfo(newAccessToken);
        }
      } catch (refreshError) {
        console.error('Error refreshing access token:', refreshError);
        throw refreshError;
      }
    } else {
      console.error('Error fetching profile info:', error);
      throw error;
    }
  }
};

const processProfileInfo = (profileData) => {
  return {
    country: profileData.country,
    display_name: profileData.display_name,
    email: profileData.email,
    explicit_content: {
      filter_enabled: profileData.explicit_content.filter_enabled,
      filter_locked: profileData.explicit_content.filter_locked,
    },
    external_urls: {
      spotify: profileData.external_urls.spotify,
    },
    followers: {
      href: profileData.followers.href,
      total: profileData.followers.total,
    },
    id: profileData.id,
    images: profileData.images,
    product: profileData.product,
    type: profileData.type,
    uri: profileData.uri,
  };
};

const checkFollowingStatus = async (accessToken, type, ids) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/following/contains?type=${type}&ids=${ids.join(',')}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error checking following status:', error);
    throw error;
  }
};

export const fetchAndProcessProfileInfo = async (accessToken) => {
  try {
    const profileData = await getProfileInfo(accessToken);
    const processedData = processProfileInfo(profileData);
    return processedData;
  } catch (error) {
    console.error('Error fetching and processing profile info:', error);
    throw error;
  }
};

export const fetchFollowingStatus = async (accessToken, type, ids) => {
  try {
    const followingStatus = await checkFollowingStatus(accessToken, type, ids);
    return followingStatus;
  } catch (error) {
    console.error('Error fetching following status:', error);
    throw error;
  }
};
