import {PermissionsAndroid, Platform} from 'react-native';
import {Camera} from 'react-native-vision-camera';

export async function requestCameraPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  const permission: any = await Camera.requestCameraPermission();
  return permission === 'authorized';
}
