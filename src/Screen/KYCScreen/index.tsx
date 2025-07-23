import React, { useState, useEffect, useRef } from 'react';
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
import { launchImageLibrary, launchCamera, ImagePickerResponse, MediaType, PhotoQuality } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfirmKYC } from '../../../services/userRedux/userSlice';
import { AppDispatch, RootState } from '../../../services/store/store';
import FaceMatchingWebView, { FaceMatchingWebViewRef, faceMatchingService } from '../../utils/FaceMatchingWebView';

interface KycScreenProps {
  navigation: any;
}

interface VerificationResult {
  idValid: boolean;
  faceMatch: boolean;
  similarity?: number;
  confidence?: number;
  error?: string;
  processingTime?: string;
}

export default function KycScreen({ navigation }: KycScreenProps) {
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
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isFaceMatching, setIsFaceMatching] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');

  // WebView ref for face matching
  const faceMatchingWebViewRef = useRef<FaceMatchingWebViewRef>(null);

  useEffect(() => {
    // Set the WebView reference in the service and preload models
    faceMatchingService.setWebViewRef(faceMatchingWebViewRef);
  }, []);

  useEffect(() => {
    if (isSuccessConfirmKYC) {
      Alert.alert('Success', 'KYC verification completed successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  }, [isSuccessConfirmKYC]);

  useEffect(() => {
    if (isErrorConfirmKYC) {
      Alert.alert('Error', errorMessageConfirmKYC);
    }
  }, [isErrorConfirmKYC, errorMessageConfirmKYC]);

  const handleModelsLoaded = () => {
    console.log('[KYC] Face recognition models loaded and ready');
    setModelsLoaded(true);
  };

  // Optimized image picker with compression
  const pickIdCardImage = () => {
    console.log('[KYC] pickIdCardImage: opening gallery/scan');
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 0.8 as PhotoQuality,
      maxWidth: 1200, // Slightly larger for ID cards
      maxHeight: 800,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.assets && response.assets[0]) {
        console.log('[KYC] pickIdCardImage: got uri', response.assets[0].uri);
        setIdCardImage(response.assets[0].uri!);
        setVerificationResult(null);
      }
    });
  };

  const pickFaceImage = () => {
    console.log('[KYC] pickFaceImage: opening camera/gallery');
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 0.8 as PhotoQuality,
      maxWidth: 800, // Smaller for selfies
      maxHeight: 800,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.assets && response.assets[0]) {
        console.log('[KYC] pickFaceImage: got uri', response.assets[0].uri);
        setFaceImage(response.assets[0].uri!);
        setVerificationResult(null);
      }
    });
  };

  const navigateToIdScan = () => {
    navigation.navigate('ScanCCCD', {
      onImageCaptured: (imagePath: string) => {
        setIdCardImage(imagePath);
        setVerificationResult(null);
      },
    });
  };

  const navigateToFaceScan = () => {
    navigation.navigate('ScanFace', {
      onImageCaptured: (imagePath: string) => {
        setFaceImage(imagePath);
        setVerificationResult(null);
      },
    });
  };

  // Faster basic validation
  const validateImages = async (idUri: string, faceUri: string): Promise<boolean> => {
    console.log('[KYC] validateImages: checking both images');
    
    return new Promise((resolve) => {
      let completed = 0;
      let allValid = true;
      
      const checkComplete = () => {
        completed++;
        if (completed === 2) {
          resolve(allValid);
        }
      };
      
      // Validate ID card
      Image.getSize(
        idUri,
        (width, height) => {
          if (width < 200 || height < 100) allValid = false;
          checkComplete();
        },
        () => {
          allValid = false;
          checkComplete();
        }
      );
      
      // Validate face image
      Image.getSize(
        faceUri,
        (width, height) => {
          const aspectRatio = width / height;
          if (aspectRatio < 0.5 || aspectRatio > 2 || width < 100 || height < 100) {
            allValid = false;
          }
          checkComplete();
        },
        () => {
          allValid = false;
          checkComplete();
        }
      );
    });
  };

  // Handle face matching result from WebView
  const handleFaceMatchResult = (result: {
    similarity: number;
    isMatch: boolean;
    confidence: number;
    error?: string;
    processingTime?: string;
  }) => {
    console.log('[KYC] handleFaceMatchResult:', result);
    setIsFaceMatching(false);
    setProcessingStatus('');
    
    if (result.error) {
      Alert.alert('Face Matching Error', result.error);
      setVerificationResult({
        idValid: true,
        faceMatch: false,
        error: result.error
      });
      setIsProcessing(false);
      return;
    }

    const newVerificationResult: VerificationResult = {
      idValid: true,
      faceMatch: result.isMatch,
      similarity: result.similarity,
      confidence: result.confidence,
      processingTime: result.processingTime
    };

    setVerificationResult(newVerificationResult);
    setIsProcessing(false);

    if (result.isMatch) {
      Alert.alert(
        'Verification Successful',
        `Face match found!\nSimilarity: ${(result.similarity * 100).toFixed(1)}%\nConfidence: ${(result.confidence * 100).toFixed(1)}%\nProcessing time: ${result.processingTime}ms\n\nProceeding with KYC confirmation...`,
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(fetchConfirmKYC() as any);
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'Verification Failed',
        `Face verification failed.\nSimilarity: ${(result.similarity * 100).toFixed(1)}%\nProcessing time: ${result.processingTime}ms\nPlease ensure both images clearly show the same person's face.`
      );
    }
  };

  // Enhanced verification process
  const performVerification = async () => {
    console.log('[KYC] performVerification: start');
    if (!idCardImage || !faceImage) {
      console.warn('[KYC] performVerification: missing images');
      Alert.alert('Error', 'Please provide both ID card and face images');
      return;
    }

    // Check if models are loaded
    if (!modelsLoaded) {
      Alert.alert(
        'Please Wait',
        'Face recognition models are still loading. Please try again in a moment.',
        [
          {
            text: 'Retry',
            onPress: () => {
              setTimeout(() => performVerification(), 2000);
            },
          },
        ]
      );
      return;
    }

    setIsProcessing(true);
    setProcessingStatus('Validating images...');

    try {
      // Quick validation
      console.log('[KYC] performVerification: validating images');
      const imagesValid = await validateImages(idCardImage, faceImage);

      if (!imagesValid) {
        console.warn('[KYC] performVerification: images invalid');
        Alert.alert('Error', 'Please provide clear, valid images for both ID card and face.');
        setIsProcessing(false);
        setProcessingStatus('');
        return;
      }

      // Perform face matching
      console.log('[KYC] performVerification: starting face matching');
      setIsFaceMatching(true);
      setProcessingStatus('Analyzing faces...');
      
      if (faceMatchingWebViewRef.current) {
        await faceMatchingWebViewRef.current.compareFaces(idCardImage, faceImage);
        console.log('[KYC] performVerification: face matching initiated');
      } else {
        throw new Error('Face matching WebView not initialized');
      }

    } catch (error) {
      console.error('Verification error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('[KYC] performVerification: error', error);
      Alert.alert('Error', `An error occurred during verification: ${errorMessage}`);
      setIsProcessing(false);
      setIsFaceMatching(false);
      setProcessingStatus('');
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
      {/* Hidden WebView for face matching */}
      <FaceMatchingWebView
        ref={faceMatchingWebViewRef}
        onFaceMatchResult={handleFaceMatchResult}
        onModelsLoaded={handleModelsLoaded}
      />

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

      {/* Models loading status */}
      {!modelsLoaded && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#007bff" />
          <Text style={styles.loadingText}>Loading face recognition models...</Text>
        </View>
      )}

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
            <Image source={{ uri: idCardImage }} style={styles.previewImage} />
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
            <Image source={{ uri: faceImage }} style={styles.previewImage} />
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

      {/* Processing Status */}
      {processingStatus && (
        <View style={styles.statusContainer}>
          <ActivityIndicator size="small" color="#007bff" />
          <Text style={styles.statusText}>{processingStatus}</Text>
        </View>
      )}

      {/* Processing Indicator */}
      {isFaceMatching && (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.processingText}>Analyzing faces...</Text>
          <Text style={styles.processingSubtext}>This may take a few seconds</Text>
        </View>
      )}

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
          {verificationResult.similarity !== undefined && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Similarity:</Text>
              <Text style={styles.resultValue}>
                {(verificationResult.similarity * 100).toFixed(1)}%
              </Text>
            </View>
          )}
          {verificationResult.confidence !== undefined && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Confidence:</Text>
              <Text style={styles.resultValue}>
                {(verificationResult.confidence * 100).toFixed(1)}%
              </Text>
            </View>
          )}
          {verificationResult.processingTime && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Processing Time:</Text>
              <Text style={styles.resultValue}>
                {verificationResult.processingTime}ms
              </Text>
            </View>
          )}
          {verificationResult.error && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Error:</Text>
              <Text style={[styles.resultValue, styles.error]}>
                {verificationResult.error}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Verify Button */}
      <TouchableOpacity
        style={[
          styles.verifyButton,
          (!idCardImage || !faceImage || isProcessing || isLoadingConfirmKYC || isFaceMatching || !modelsLoaded) &&
            styles.disabledButton,
        ]}
        onPress={performVerification}
        disabled={
          !idCardImage || !faceImage || isProcessing || isLoadingConfirmKYC || isFaceMatching || !modelsLoaded
        }>
        {isProcessing || isLoadingConfirmKYC || isFaceMatching ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.verifyButtonText}>
            {!modelsLoaded ? 'Loading Models...' : 'Verify Identity'}
          </Text>
        )}
      </TouchableOpacity>

      {/* Performance tip */}
      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>
          💡 Tip: For best results, ensure good lighting and clear face visibility in both images
        </Text>
      </View>
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
    processingContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
  },
    processingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#007bff',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#e3f2fd',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#1976d2',
  },
  processingSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  tipContainer: {
    margin: 16,
    padding: 12,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  tipText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 16,
  },
});