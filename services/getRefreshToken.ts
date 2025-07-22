import {loadTokens} from '../src/utils/tokenStorage';

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const tokens = await loadTokens();
    return tokens?.refreshToken || null;
  } catch (error) {
    console.error('❌ Failed to get refresh token:', error);
    return null;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const tokens = await loadTokens();
    return tokens?.accessToken || null;
  } catch (error) {
    console.error('❌ Failed to get access token:', error);
    return null;
  }
};
