import * as Keychain from 'react-native-keychain';

export async function saveTokens({ accessToken, refreshToken }) {
  // store both as a single JSON blob
  await Keychain.setGenericPassword(
    'tokendata',
    JSON.stringify({ accessToken, refreshToken }),
    { accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED }
  );
}

export async function loadTokens() {
  const creds = await Keychain.getGenericPassword();
  if (!creds) return null;
  return JSON.parse(creds.password);
}

export async function clearTokens() {
  await Keychain.resetGenericPassword();
}
