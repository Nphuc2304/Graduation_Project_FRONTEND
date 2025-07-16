import * as Keychain from 'react-native-keychain';

export async function saveTokens({accessToken, refreshToken}: any) {
  try {
    // store both as a single JSON blob
    await Keychain.setGenericPassword(
      'tokendata',
      JSON.stringify({accessToken, refreshToken}),
      {
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
        service: 'auth_tokens',
      },
    );
    console.log('✅ Tokens saved successfully');
  } catch (error) {
    console.error('❌ Failed to save tokens:', error);
    throw error;
  }
}

export async function loadTokens() {
  try {
    const creds = await Keychain.getGenericPassword({
      service: 'auth_tokens',
    });
    if (!creds) {
      console.log('⚠️ No tokens found in keychain');
      return null;
    }
    const tokens = JSON.parse(creds.password);
    console.log('✅ Tokens loaded successfully');
    return tokens;
  } catch (error) {
    console.error('❌ Failed to load tokens:', error);
    return null;
  }
}

export async function clearTokens() {
  try {
    await Keychain.resetGenericPassword({
      service: 'auth_tokens',
    });
    console.log('✅ Tokens cleared successfully');
  } catch (error) {
    console.error('❌ Failed to clear tokens:', error);
    throw error;
  }
}

// Functions for saving and loading login credentials
export async function saveLoginCredentials({username, password}: any) {
  try {
    await Keychain.setGenericPassword(
      'login_credentials',
      JSON.stringify({username, password}),
      {
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
        service: 'login_credentials',
      },
    );
    console.log('✅ Login credentials saved successfully');
  } catch (error) {
    console.error('❌ Failed to save login credentials:', error);
    throw error;
  }
}

export async function loadLoginCredentials() {
  try {
    const creds = await Keychain.getGenericPassword({
      service: 'login_credentials',
    });
    if (!creds) {
      console.log('⚠️ No login credentials found in keychain');
      return null;
    }
    const credentials = JSON.parse(creds.password);
    console.log('✅ Login credentials loaded successfully');
    return credentials;
  } catch (error) {
    console.error('❌ Failed to load login credentials:', error);
    return null;
  }
}

export async function clearLoginCredentials() {
  try {
    // Clear only login credentials by specifying the service
    await Keychain.resetGenericPassword({
      service: 'login_credentials',
    });
    console.log('✅ Login credentials cleared successfully');
  } catch (error) {
    console.error('❌ Failed to clear login credentials:', error);
    throw error;
  }
}
