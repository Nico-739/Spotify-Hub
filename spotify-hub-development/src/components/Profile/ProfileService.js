import axios from 'axios';

const getProfileInfo = async (accessToken) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching profile info:', error);
    throw error;
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
