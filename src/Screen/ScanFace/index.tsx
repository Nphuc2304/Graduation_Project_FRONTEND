import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Camera, useCameraDevices, PhotoFile} from 'react-native-vision-camera';
import {requestCameraPermission} from '../../utils/permission';

interface ScanFaceProps {
  navigation: any;
  route: {
    params?: {
      onImageCaptured?: (imagePath: string) => void;
    };
  };
}

export default function ScanFaceScreen({navigation, route}: ScanFaceProps) {
  const camera = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const devices = useCameraDevices();
  const deviceList = Object.values(devices ?? {});

  // Start with front camera (index 1) for selfies
  const [cameraIndex, setCameraIndex] = useState(1);
  const device = deviceList[cameraIndex];

  const [isFlashOn, setIsFlashOn] = useState(false);
  const [photo, setPhoto] = useState<PhotoFile | null>(null);

  const onImageCaptured = route.params?.onImageCaptured;

  useEffect(() => {
    (async () => {
      const granted = await requestCameraPermission();
      console.log('📷 Camera permission granted:', granted);
      setHasPermission(granted);
    })();
  }, []);

  useEffect(() => {
    console.log('📷 Has permission?', hasPermission);
    console.log('📱 Devices:', deviceList);
    console.log('📱 Selected camera device:', device);
  }, [hasPermission, devices, cameraIndex]);

  const toggleCamera = () => {
    setCameraIndex(prev => (prev === 0 ? 1 : 0));
  };

  const toggleFlash = () => {
    setIsFlashOn(prev => !prev);
  };

  const takePhoto = async () => {
    if (camera.current == null) return;
    try {
      const photo = await camera.current.takePhoto({
        flash: isFlashOn ? 'on' : 'off',
      });
      setPhoto(photo);
      console.log('📸 Photo saved at:', photo.path);

      // If there's a callback, call it with the photo path
      if (onImageCaptured) {
        onImageCaptured(`file://${photo.path}`);
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (hasPermission === null) return <Text>Đang kiểm tra quyền...</Text>;
  if (!hasPermission) return <Text>Không có quyền truy cập camera</Text>;
  if (!device) return <Text>Không tìm thấy camera</Text>;

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        torch={isFlashOn ? 'on' : 'off'}
      />
      <TouchableOpacity style={styles.backBTN} onPress={goBack}>
        <Image
          style={styles.icon}
          source={require('../../../assets/icons/back.png')}
        />
      </TouchableOpacity>
      <View style={styles.faceFrame} />
      <View style={styles.instruction}>
        <Text style={styles.title}>Center your face</Text>
        <Text style={styles.text}>
          Point your face right at the box, then take a photo
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={toggleCamera} style={styles.button}>
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/camera.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto} style={styles.buttonTakePicture}>
          <View style={styles.takePicture}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFlash} style={styles.button}>
          <Image
            style={styles.icon}
            source={
              isFlashOn
                ? require('../../../assets/icons/flash_on.png')
                : require('../../../assets/icons/flash_off.png')
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  backBTN: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    top: 20,
    left: '5%',
    padding: 14,
    backgroundColor: '#696969',
  },
  faceFrame: {
    position: 'absolute',
    top: '15%',
    left: '5%',
    width: '90%',
    height: '50%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
  },
  instruction: {
    width: '70%',
    left: '15%',
    position: 'absolute',
    bottom: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10,
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#696969',
    width: 50,
    height: 50,
    padding: 14,
    borderRadius: 25,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  buttonTakePicture: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#fff',
    marginHorizontal: 20,
  },
  takePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
