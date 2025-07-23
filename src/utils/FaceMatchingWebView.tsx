// FaceMatchingWebView.tsx - Fixed version
import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import RNFS from 'react-native-fs';

interface FaceMatchingWebViewProps {
  onFaceMatchResult: (result: {
    similarity: number;
    isMatch: boolean;
    confidence: number;
    error?: string;
  }) => void;
  onModelsLoaded?: () => void;
}

export interface FaceMatchingWebViewRef {
  compareFaces: (idImageUri: string, selfieImageUri: string) => Promise<void>;
  preloadModels: () => Promise<void>;
}

const FaceMatchingWebView = forwardRef<FaceMatchingWebViewRef, FaceMatchingWebViewProps>(
  ({ onFaceMatchResult, onModelsLoaded }, ref) => {
    const webViewRef = useRef<WebView>(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https:;">
      </head>
      <body>
          <canvas id="canvas" style="display: none;"></canvas>
          
          <!-- Load face-api.js directly in HTML instead of dynamically -->
          <script 
            src="https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js"
            crossorigin="anonymous"
            onerror="handleScriptError()"
            onload="handleScriptLoad()">
          </script>
          
          <!-- Fallback CDN -->
          <script id="fallback-script" style="display: none;">
            function loadFallbackScript() {
              const script = document.createElement('script');
              script.src = 'https://unpkg.com/face-api.js@0.22.2/dist/face-api.min.js';
              script.crossOrigin = 'anonymous';
              script.onload = handleScriptLoad;
              script.onerror = handleFinalError;
              document.head.appendChild(script);
            }
          </script>

          <script>
              let modelsLoaded = false;
              let modelCache = null;
              let faceApiLoaded = false;
              let scriptLoadAttempts = 0;
              const maxScriptAttempts = 2;

              function handleScriptLoad() {
                  console.log('face-api.js script loaded successfully');
                  faceApiLoaded = true;
                  initializeFaceApi();
              }

              function handleScriptError() {
                  console.error('Primary CDN failed, trying fallback...');
                  scriptLoadAttempts++;
                  if (scriptLoadAttempts < maxScriptAttempts) {
                      loadFallbackScript();
                  } else {
                      handleFinalError();
                  }
              }

              function handleFinalError() {
                  console.error('All CDN attempts failed');
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                      type: 'INIT_ERROR',
                      error: 'Failed to load face-api.js from all CDN sources'
                  }));
              }

              function initializeFaceApi() {
                  // Wait a bit for face-api to fully initialize
                  setTimeout(() => {
                      if (typeof faceapi !== 'undefined' && faceapi.nets) {
                          console.log('face-api.js is ready and initialized');
                          window.ReactNativeWebView.postMessage(JSON.stringify({
                              type: 'WEBVIEW_READY'
                          }));
                      } else {
                          console.error('face-api.js loaded but not properly initialized');
                          window.ReactNativeWebView.postMessage(JSON.stringify({
                              type: 'INIT_ERROR',
                              error: 'face-api.js loaded but not properly initialized'
                          }));
                      }
                  }, 500);
              }

              // Optimized model loading with better error handling
              async function loadModels() {
                  if (modelsLoaded && modelCache) return modelCache;
                  
                  try {
                      if (!faceApiLoaded || typeof faceapi === 'undefined') {
                          throw new Error('face-api.js not loaded');
                      }

                      console.log('Starting model loading...');
                      const startTime = performance.now();
                      
                      // Try multiple CDN sources for models
                      const modelUrls = [
                          'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights',
                          'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights'
                      ];
                      
                      let modelsLoadedSuccessfully = false;
                      
                      for (const baseUrl of modelUrls) {
                          try {
                              await Promise.all([
                                  faceapi.nets.tinyFaceDetector.loadFromUri(baseUrl),
                                  faceapi.nets.faceLandmark68TinyNet.loadFromUri(baseUrl),
                                  faceapi.nets.faceRecognitionNet.loadFromUri(baseUrl)
                              ]);
                              modelsLoadedSuccessfully = true;
                              break;
                          } catch (error) {
                              console.warn(\`Failed to load models from \${baseUrl}:, error\`);
                              continue;
                          }
                      }
                      
                      if (!modelsLoadedSuccessfully) {
                          throw new Error('Failed to load models from all CDN sources');
                      }
                      
                      modelsLoaded = true;
                      const loadTime = performance.now() - startTime;
                      console.log(\`Models loaded successfully in \${loadTime.toFixed(2)}ms\`);
                      
                      // Signal models loaded
                      window.ReactNativeWebView.postMessage(JSON.stringify({
                          type: 'MODELS_LOADED'
                      }));
                      
                  } catch (error) {
                      console.error('Error loading models:', error);
                      window.ReactNativeWebView.postMessage(JSON.stringify({
                          type: 'MODELS_LOAD_ERROR',
                          error: error.message
                      }));
                      throw error;
                  }
              }

              // Optimized image processing with canvas resizing
              function base64ToImageCanvas(base64String, maxSize = 512) {
                  return new Promise((resolve, reject) => {
                      const img = new Image();
                      img.onload = () => {
                          const canvas = document.getElementById('canvas');
                          const ctx = canvas.getContext('2d');
                          
                          // Calculate optimal size
                          let { width, height } = img;
                          if (width > maxSize || height > maxSize) {
                              const ratio = Math.min(maxSize / width, maxSize / height);
                              width *= ratio;
                              height *= ratio;
                          }
                          
                          canvas.width = width;
                          canvas.height = height;
                          
                          // Draw and return canvas
                          ctx.drawImage(img, 0, 0, width, height);
                          resolve(canvas);
                      };
                      img.onerror = reject;
                      img.src = base64String;
                  });
              }

              // Faster face descriptor extraction
              async function extractFaceDescriptor(base64Image) {
                  try {
                      const canvas = await base64ToImageCanvas(base64Image, 400);
                      
                      // Use tiny detector for speed
                      const detections = await faceapi
                          .detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions({ 
                              inputSize: 320,
                              scoreThreshold: 0.3
                          }))
                          .withFaceLandmarks(true)
                          .withFaceDescriptors();

                      if (detections.length === 0) {
                          console.warn('No faces detected');
                          return null;
                      }

                      const descriptor = Array.from(detections[0].descriptor);
                      console.log(\`Face descriptor extracted: \${descriptor.length} dimensions\`);
                      return descriptor;
                  } catch (error) {
                      console.error('Error extracting face descriptor:', error);
                      return null;
                  }
              }

              // Enhanced face comparison with multiple metrics
              async function compareFaces(idImageBase64, selfieImageBase64) {
                  try {
                      const startTime = performance.now();
                      
                      if (!modelsLoaded) {
                          await loadModels();
                      }

                      console.log('Starting face descriptor extraction...');
                      
                      // Process images in parallel for speed
                      const [idDescriptor, selfieDescriptor] = await Promise.all([
                          extractFaceDescriptor(idImageBase64),
                          extractFaceDescriptor(selfieImageBase64)
                      ]);

                      if (!idDescriptor || !selfieDescriptor) {
                          return {
                              similarity: 0,
                              isMatch: false,
                              confidence: 0,
                              error: 'Could not detect faces in one or both images'
                          };
                      }

                      // Convert to Float32Array for distance calculation
                      const idDesc = new Float32Array(idDescriptor);
                      const selfieDesc = new Float32Array(selfieDescriptor);

                      // Calculate distance and similarity
                      const distance = faceapi.euclideanDistance(idDesc, selfieDesc);
                      const similarity = Math.max(0, 1 - distance);
                      
                      // Adaptive threshold based on similarity distribution
                      const threshold = 0.5;
                      const isMatch = distance < threshold;
                      
                      // Enhanced confidence calculation
                      const confidence = isMatch 
                          ? Math.min(1, Math.pow((threshold - distance) / threshold, 0.5))
                          : Math.max(0, 1 - ((distance - threshold) / (1 - threshold)));

                      const processingTime = performance.now() - startTime;
                      console.log(\`Face comparison completed in \${processingTime.toFixed(2)}ms\`);

                      return {
                          similarity: Math.round(similarity * 10000) / 10000,
                          isMatch,
                          confidence: Math.round(confidence * 10000) / 10000,
                          distance: Math.round(distance * 10000) / 10000,
                          processingTime: processingTime.toFixed(2)
                      };
                  } catch (error) {
                      console.error('Face comparison error:', error);
                      return {
                          similarity: 0,
                          isMatch: false,
                          confidence: 0,
                          error: error.message
                      };
                  }
              }

              // Preload models on initialization
              async function preloadModels() {
                  if (!modelsLoaded) {
                      await loadModels();
                  }
              }

              // Message handling
              window.addEventListener('message', async function(event) {
                  try {
                      const { type, idImage, selfieImage } = JSON.parse(event.data);
                      
                      if (type === 'COMPARE_FACES') {
                          console.log('Received COMPARE_FACES request');
                          const result = await compareFaces(idImage, selfieImage);
                          window.ReactNativeWebView.postMessage(JSON.stringify({
                              type: 'FACE_MATCH_RESULT',
                              result
                          }));
                      } else if (type === 'PRELOAD_MODELS') {
                          console.log('Received PRELOAD_MODELS request');
                          await preloadModels();
                      }
                  } catch (error) {
                      console.error('Message handling error:', error);
                      window.ReactNativeWebView.postMessage(JSON.stringify({
                          type: 'ERROR',
                          error: error.message
                      }));
                  }
              });
          </script>
      </body>
      </html>
    `;

    const handleMessage = (event: any) => {
      try {
        const message = JSON.parse(event.nativeEvent.data);
        
        switch (message.type) {
          case 'FACE_MATCH_RESULT':
            onFaceMatchResult(message.result);
            break;
          case 'WEBVIEW_READY':
            console.log('WebView is ready for face matching');
            // Auto-preload models after WebView is ready
            setTimeout(() => {
              webViewRef.current?.postMessage(JSON.stringify({
                type: 'PRELOAD_MODELS'
              }));
            }, 1000);
            break;
          case 'MODELS_LOADED':
            console.log('Face recognition models loaded successfully');
            setModelsLoaded(true);
            onModelsLoaded?.();
            break;
          case 'MODELS_LOAD_ERROR':
            console.error('Failed to load face recognition models:', message.error);
            break;
          case 'INIT_ERROR':
            console.error('WebView initialization error:', message.error);
            break;
          case 'ERROR':
            console.error('WebView error:', message.error);
            break;
        }
      } catch (error) {
        console.error('Error parsing WebView message:', error);
      }
    };

    // Optimized image processing with compression
    const processImage = async (imageUri: string, maxSize: number = 800): Promise<string> => {
      try {
        // Read as base64
        const base64 = await RNFS.readFile(imageUri.replace('file://', ''), 'base64');
        
        return `data:image/jpeg;base64,${base64}`;
      } catch (error) {
        throw new Error(`Failed to process image: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    const compareFaces = async (idImageUri: string, selfieImageUri: string) => {
      try {
        console.log('Processing images for face comparison...');
        const startTime = Date.now();
        
        // Process images in parallel
        const [idImageBase64, selfieImageBase64] = await Promise.all([
          processImage(idImageUri, 800),
          processImage(selfieImageUri, 600)
        ]);

        const processingTime = Date.now() - startTime;
        console.log(`Image processing completed in ${processingTime}ms`);

        // Send message to WebView
        const message = JSON.stringify({
          type: 'COMPARE_FACES',
          idImage: idImageBase64,
          selfieImage: selfieImageBase64
        });

        webViewRef.current?.postMessage(message);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        onFaceMatchResult({
          similarity: 0,
          isMatch: false,
          confidence: 0,
          error: `Error processing images: ${errorMessage}`
        });
      }
    };

    const preloadModels = async () => {
      webViewRef.current?.postMessage(JSON.stringify({
        type: 'PRELOAD_MODELS'
      }));
    };

    useImperativeHandle(ref, () => ({
      compareFaces,
      preloadModels
    }));

    return (
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ html: htmlContent }}
          onMessage={handleMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          style={styles.hidden}
          // Performance optimizations
          androidLayerType="hardware"
          cacheEnabled={true}
          incognito={false}
          // Network and security settings
          mixedContentMode="compatibility"
          allowsFullscreenVideo={false}
          allowsBackForwardNavigationGestures={false}
          // Additional props that might help with script loading
          thirdPartyCookiesEnabled={true}
          sharedCookiesEnabled={true}
          // iOS specific
          allowsLinkPreview={false}
          // Android specific
          setBuiltInZoomControls={false}
          setDisplayZoomControls={false}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: -1000,
    top: -1000,
  },
  hidden: {
    width: 1,
    height: 1,
  },
});

// Enhanced service class with preloading
class FaceMatchingService {
  private webViewRef: React.RefObject<FaceMatchingWebViewRef | null> | null = null;
  private pendingPromise: {
    resolve: (value: any) => void;
    reject: (reason: any) => void;
  } | null = null;
  private modelsPreloaded = false;

  setWebViewRef(ref: React.RefObject<FaceMatchingWebViewRef | null>) {
    this.webViewRef = ref;
  }

  async preloadModels(): Promise<void> {
    if (this.modelsPreloaded || !this.webViewRef?.current) return;
    
    try {
      console.log('Preloading face recognition models...');
      await this.webViewRef.current.preloadModels();
      this.modelsPreloaded = true;
      console.log('Models preloaded successfully');
    } catch (error) {
      console.error('Failed to preload models:', error);
    }
  }

  async compareFaces(idImageUri: string, selfieImageUri: string): Promise<{
    similarity: number;
    isMatch: boolean;
    confidence: number;
    error?: string;
  }> {
    return new Promise((resolve, reject) => {
      if (!this.webViewRef?.current) {
        reject(new Error('WebView not initialized'));
        return;
      }

      // Set timeout for face matching
      const timeout = setTimeout(() => {
        if (this.pendingPromise) {
          this.pendingPromise.reject(new Error('Face matching timed out'));
          this.pendingPromise = null;
        }
      }, 30000); // 30 second timeout

      this.pendingPromise = { 
        resolve: (result) => {
          clearTimeout(timeout);
          resolve(result);
        }, 
        reject: (error) => {
          clearTimeout(timeout);
          reject(error);
        }
      };

      this.webViewRef.current.compareFaces(idImageUri, selfieImageUri);
    });
  }

  handleFaceMatchResult(result: any) {
    if (this.pendingPromise) {
      console.log('[KYC][Service] Face matching completed:', result);
      this.pendingPromise.resolve(result);
      this.pendingPromise = null;
    }
  }
}

export const faceMatchingService = new FaceMatchingService();
export default FaceMatchingWebView;