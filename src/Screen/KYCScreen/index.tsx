import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary, launchCamera, ImagePickerResponse, MediaType, PhotoQuality} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import { fetchConfirmKYC } from '../../../services/userRedux/userSlice';
import { AppDispatch, RootState } from '../../../services/store/store';

interface KycScreenProps {
  navigation: any;
}

export default function KycScreen({navigation}: KycScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    user,
    isLoadingConfirmKYC,
    isSuccessConfirmKYC,
    isErrorConfirmKYC,
    errorMessageConfirmKYC,
  } = useSelector((state: RootState) => state.user);
  const [idCardImage, setIdCardImage] = useState<string | null>(null);
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    idValid: boolean;
    faceMatch: boolean;
  } | null>(null);

  useEffect(() => {
    if (isSuccessConfirmKYC) {
      Alert.alert('Success', 'KYC verification completed successfully!', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    }
  }, [isSuccessConfirmKYC]);

  useEffect(() => {
    if (isErrorConfirmKYC) {
      Alert.alert('Error', errorMessageConfirmKYC);
    }
  }, [isErrorConfirmKYC, errorMessageConfirmKYC]);

  const pickIdCardImage = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 0.8 as PhotoQuality,
      maxWidth: 1024,
      maxHeight: 1024,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.assets && response.assets[0]) {
        setIdCardImage(response.assets[0].uri!);
      }
    });
  };

  const pickFaceImage = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 0.8 as PhotoQuality,
      maxWidth: 512,
      maxHeight: 512,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.assets && response.assets[0]) {
        setFaceImage(response.assets[0].uri!);
      }
    });
  };

  const navigateToIdScan = () => {
    navigation.navigate('ScanCCCD', {
      onImageCaptured: (imagePath: string) => {
        setIdCardImage(imagePath);
      },
    });
  };

  const navigateToFaceScan = () => {
    navigation.navigate('ScanFace', {
      onImageCaptured: (imagePath: string) => {
        setFaceImage(imagePath);
      },
    });
  };

  // Basic image validation function
  const validateIdCard = async (imageUri: string): Promise<boolean> => {
    // Simple validation - check if image exists and has reasonable dimensions
    return new Promise((resolve) => {
      Image.getSize(
        imageUri,
        (width, height) => {
          // Basic size validation
          const isValidSize = width > 200 && height > 100;
          resolve(isValidSize);
        },
        () => resolve(false)
      );
    });
  };

  // Basic face detection (simplified)
  const validateFaceImage = async (imageUri: string): Promise<boolean> => {
    // Simple validation - check if image exists and is roughly square (face photos tend to be)
    return new Promise((resolve) => {
      Image.getSize(
        imageUri,
        (width, height) => {
          // Basic validation for face image
          const aspectRatio = width / height;
          const isValidAspectRatio = aspectRatio > 0.5 && aspectRatio < 2;
          resolve(isValidAspectRatio && width > 100 && height > 100);
        },
        () => resolve(false)
      );
    });
  };

  // Simplified verification process
  const performVerification = async () => {
    if (!idCardImage || !faceImage) {
      Alert.alert('Error', 'Please provide both ID card and face images');
      return;
    }

    setIsProcessing(true);

    try {
      // Basic validation
      const idValid = await validateIdCard(idCardImage);
      const faceValid = await validateFaceImage(faceImage);

      // For a real implementation, you would:
      // 1. Extract text from ID using OCR
      // 2. Extract face from ID card
      // 3. Compare faces using face recognition
      // 4. Validate ID format and information

      // Simplified mock verification
      const mockVerificationResult = {
        idValid: idValid,
        faceMatch: faceValid && idValid, // Simple mock logic
      };

      setVerificationResult(mockVerificationResult);

      if (mockVerificationResult.idValid && mockVerificationResult.faceMatch) {
        Alert.alert(
          'Verification Successful',
          'Your identity has been verified. Confirming KYC...',
          [
            {
              text: 'OK',
              onPress: () => {
                // Call the KYC confirmation endpoint
                dispatch(fetchConfirmKYC() as any);
              },
            },
          ]
        );
      } else {
        let errorMessage = 'Verification failed: ';
        if (!mockVerificationResult.idValid) {
          errorMessage += 'Invalid ID card image. ';
        }
        if (!mockVerificationResult.faceMatch) {
          errorMessage += 'Face verification failed. ';
        }
        Alert.alert('Verification Failed', errorMessage);
      }
    } catch (error) {
      console.error('Verification error:', error);
      Alert.alert('Error', 'An error occurred during verification');
    } finally {
      setIsProcessing(false);
    }
  };

  if (user?.isKYC) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <Image
            style={styles.successIcon}
            source={require('../../../assets/icons/check.png')}
          />
          <Text style={styles.successTitle}>KYC Verified</Text>
          <Text style={styles.successText}>
            Your identity has already been verified.
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>KYC Verification</Text>
      </View>

      <Text style={styles.subtitle}>
        Please provide your ID card and a photo of yourself for verification
      </Text>

      {/* ID Card Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Citizenship ID Card</Text>
        <Text style={styles.sectionDescription}>
          Take a clear photo of your citizenship ID card
        </Text>

        {idCardImage ? (
          <View style={styles.imageContainer}>
            <Image source={{uri: idCardImage}} style={styles.previewImage} />
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={pickIdCardImage}>
              <Text style={styles.retakeButtonText}>Retake</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={navigateToIdScan}>
              <Image
                style={styles.actionIcon}
                source={require('../../../assets/icons/camera.png')}
              />
              <Text style={styles.actionButtonText}>Scan ID Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={pickIdCardImage}>
              <Image
                style={styles.actionIcon}
                source={require('../../../assets/icons/gallery.png')}
              />
              <Text style={styles.actionButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Face Photo Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Face Photo</Text>
        <Text style={styles.sectionDescription}>
          Take a clear photo of your face
        </Text>

        {faceImage ? (
          <View style={styles.imageContainer}>
            <Image source={{uri: faceImage}} style={styles.previewImage} />
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={pickFaceImage}>
              <Text style={styles.retakeButtonText}>Retake</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={navigateToFaceScan}>
              <Image
                style={styles.actionIcon}
                source={require('../../../assets/icons/camera.png')}
              />
              <Text style={styles.actionButtonText}>Take Selfie</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={pickFaceImage}>
              <Image
                style={styles.actionIcon}
                source={require('../../../assets/icons/gallery.png')}
              />
              <Text style={styles.actionButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Verification Results */}
      {verificationResult && (
        <View style={styles.resultsSection}>
          <Text style={styles.resultsTitle}>Verification Results:</Text>
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>ID Card Valid:</Text>
            <Text
              style={[
                styles.resultValue,
                verificationResult.idValid ? styles.success : styles.error,
              ]}>
              {verificationResult.idValid ? 'Valid' : 'Invalid'}
            </Text>
          </View>
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Face Match:</Text>
            <Text
              style={[
                styles.resultValue,
                verificationResult.faceMatch ? styles.success : styles.error,
              ]}>
              {verificationResult.faceMatch ? 'Match' : 'No Match'}
            </Text>
          </View>
        </View>
      )}

      {/* Verify Button */}
      <TouchableOpacity
        style={[
          styles.verifyButton,
          (!idCardImage || !faceImage || isProcessing || isLoadingConfirmKYC) &&
            styles.disabledButton,
        ]}
        onPress={performVerification}
        disabled={
          !idCardImage || !faceImage || isProcessing || isLoadingConfirmKYC
        }>
        {isProcessing || isLoadingConfirmKYC ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.verifyButtonText}>Verify Identity</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  imageContainer: {
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  retakeButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  retakeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    marginHorizontal: 5,
  },
  actionIcon: {
    width: 30,
    height: 30,
    tintColor: '#007bff',
    marginBottom: 8,
  },
  actionButtonText: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  resultsSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  success: {
    color: '#28a745',
  },
  error: {
    color: '#dc3545',
  },
  verifyButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    tintColor: '#28a745',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 10,
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});