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

export async function requestPhotoLibraryPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    // For Android 13+ (API level 33+), use READ_MEDIA_IMAGES
    // For older versions, use READ_EXTERNAL_STORAGE
    const androidVersion = Platform.Version;
    console.log('Android version:', androidVersion);

    // First, check if permission is already granted
    try {
      if (androidVersion >= 33) {
        const hasReadMediaImages = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        );
        console.log('READ_MEDIA_IMAGES already granted:', hasReadMediaImages);
        if (hasReadMediaImages) {
          return true;
        }
      } else {
        const hasReadExternalStorage = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        console.log(
          'READ_EXTERNAL_STORAGE already granted:',
          hasReadExternalStorage,
        );
        if (hasReadExternalStorage) {
          return true;
        }
      }
    } catch (error) {
      console.log('Error checking existing permissions:', error);
    }

    if (androidVersion >= 33) {
      try {
        console.log('Requesting READ_MEDIA_IMAGES permission...');
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: 'Quyền truy cập thư viện ảnh',
            message:
              'Ứng dụng cần quyền truy cập thư viện ảnh để thay đổi ảnh đại diện',
            buttonNeutral: 'Hỏi lại sau',
            buttonNegative: 'Từ chối',
            buttonPositive: 'Đồng ý',
          },
        );
        console.log('READ_MEDIA_IMAGES permission result:', result);
        return result === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.log('READ_MEDIA_IMAGES permission error:', error);
        console.log('Falling back to READ_EXTERNAL_STORAGE...');
        // Fallback to READ_EXTERNAL_STORAGE for older versions
        try {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Quyền truy cập thư viện ảnh',
              message:
                'Ứng dụng cần quyền truy cập thư viện ảnh để thay đổi ảnh đại diện',
              buttonNeutral: 'Hỏi lại sau',
              buttonNegative: 'Từ chối',
              buttonPositive: 'Đồng ý',
            },
          );
          console.log('READ_EXTERNAL_STORAGE permission result:', result);
          return result === PermissionsAndroid.RESULTS.GRANTED;
        } catch (fallbackError) {
          console.log('READ_EXTERNAL_STORAGE permission error:', fallbackError);
          return false;
        }
      }
    } else {
      console.log('Requesting READ_EXTERNAL_STORAGE permission...');
      try {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Quyền truy cập thư viện ảnh',
            message:
              'Ứng dụng cần quyền truy cập thư viện ảnh để thay đổi ảnh đại diện',
            buttonNeutral: 'Hỏi lại sau',
            buttonNegative: 'Từ chối',
            buttonPositive: 'Đồng ý',
          },
        );
        console.log('READ_EXTERNAL_STORAGE permission result:', result);
        return result === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.log('READ_EXTERNAL_STORAGE permission error:', error);
        return false;
      }
    }
  }

  // On iOS, photo library permission is handled automatically by react-native-image-picker
  console.log('iOS platform - photo library permission handled automatically');
  return true;
}
