import axios from "axios";

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.error("Refresh token not found.");
      return null;
    }

    const clientId = "9927b119c4a7420ca10a6a881a955e6f";
    const clientSecret = "8776f50ee48b485780b87bce3bffca19";

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, expires_in } = response.data;

    localStorage.setItem("accessToken", access_token);
    localStorage.setItem(
      "tokenExpiry",
      new Date().getTime() + expires_in * 1000
    );

    return access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};