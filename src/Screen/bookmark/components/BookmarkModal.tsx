import React, { memo, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Animated,
  PanResponder,
} from 'react-native';
import { Campaign } from '@services/bookMarkRedux';

const { height: screenHeight } = Dimensions.get('window');

interface BookmarkModalProps {
  visible: boolean;
  selectedCampaign: Campaign | null;
  onClose: () => void;
  onRemove: () => void;
}

export const BookmarkModal = memo<BookmarkModalProps>(({
  visible,
  selectedCampaign,
  onClose,
  onRemove,
}) => {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  console.log('BookmarkModal render:', { visible, selectedCampaign: selectedCampaign?.id });

  // Animation effects
  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Hide animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: screenHeight,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, opacityAnim]);

  // Pan responder for swipe down to close
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy > 0 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 100) {
          // Close if swiped down more than 100px
          onClose();
        } else {
          // Snap back to original position
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!visible) return null;

  if (!selectedCampaign) {
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text>No campaign selected</Text>
            <TouchableOpacity onPress={onClose}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  const percent = parseFloat(
    Math.min(
      100,
      Math.max(
        0,
        (selectedCampaign.priceCurrent / selectedCampaign.totalGoal) * 100,
      ),
    ).toFixed(0),
  );

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}>

      {/* Background Overlay */}
      <Animated.View style={[styles.modalBackground, { opacity: opacityAnim }]}>
        <TouchableOpacity
          style={styles.backgroundTouchable}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Modal Content */}
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
          {...panResponder.panHandlers}>

          {/* Handle Bar */}
          <View style={styles.handleBar} />

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}>

            {/* Campaign Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: selectedCampaign.images?.[0] || 'https://picsum.photos/300/200',
                }}
                style={styles.campaignImage}
                resizeMode="cover"
              />
            </View>

            {/* Campaign Title */}
            <Text style={styles.campaignTitle} numberOfLines={2}>
              {selectedCampaign.name}
            </Text>

            {/* Funding Info */}
            <View style={styles.fundingContainer}>
              <Text style={styles.fundingText}>
                <Text style={styles.primaryText}>
                  {selectedCampaign.priceCurrent.toLocaleString()} VNĐ
                </Text>
                {' fund raised from '}
                <Text style={styles.primaryText}>
                  {selectedCampaign.totalGoal.toLocaleString()} VNĐ
                </Text>
              </Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressSection}>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${percent}%` }
                  ]}
                />
              </View>
              <Text style={styles.percentageText}>{percent}%</Text>
            </View>

            {/* Stats */}
            <View style={styles.statsSection}>
              <Text style={styles.statText}>
                <Text style={styles.primaryText}>
                  {selectedCampaign.donators.toLocaleString()}
                </Text>
                {' Donators'}
              </Text>
              <Text style={styles.statText}>
                <Text style={styles.primaryText}>
                  {selectedCampaign.dayLeft}
                </Text>
                {' days left'}
              </Text>
            </View>

            {/* Remove Question */}
            <Text style={styles.questionText}>
              Remove from your bookmark?
            </Text>

          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.removeButton]}
              onPress={onRemove}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backgroundTouchable: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: screenHeight * 0.85,
    minHeight: screenHeight * 0.5,
    paddingTop: 15,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  handleBar: {
    width: 50,
    height: 5,
    backgroundColor: '#D1D5DB',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    marginTop: 10,
  },
  campaignImage: {
    width: '100%',
    height: '100%',
  },
  campaignTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 15,
    lineHeight: 26,
  },
  fundingContainer: {
    marginBottom: 15,
  },
  fundingText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  primaryText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: '#E8E8E8',
    borderRadius: 3,
    marginRight: 15,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    minWidth: 35,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statText: {
    fontSize: 15,
    color: '#666',
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  buttonSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 15,
    gap: 15,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  removeButton: {
    backgroundColor: '#007AFF',
  },
  removeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});