import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native';
import {ZaloPayService} from '../../../../services/zalopayService';
import {useTheme} from '../../../utils/ThemeContext';

interface PaymentStatusTrackerProps {
  appTransId: string;
  onStatusChange: (status: 'pending' | 'success' | 'failed') => void;
  onComplete: () => void;
}

export const PaymentStatusTracker: React.FC<PaymentStatusTrackerProps> = ({
  appTransId,
  onStatusChange,
  onComplete,
}) => {
  const [isPolling, setIsPolling] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const {colors} = useTheme();

  const maxAttempts = 60; // 5 minutes with 5-second intervals

  useEffect(() => {
    if (appTransId) {
      startPolling();
    }

    return () => {
      setIsPolling(false);
    };
  }, [appTransId]);

  const startPolling = () => {
    setIsPolling(true);
    setAttempts(0);
    pollPaymentStatus();
  };

  const pollPaymentStatus = async () => {
    if (!isPolling || attempts >= maxAttempts) {
      if (attempts >= maxAttempts) {
        Alert.alert(
          'Payment Status',
          'Payment is being processed. Please check your ZaloPay app for confirmation.',
          [{text: 'OK', onPress: onComplete}],
        );
      }
      return;
    }

    try {
      const response = await ZaloPayService.queryPayment(appTransId);

      if (response.return_code === 1) {
        console.log('✅ Payment confirmed:', response);
        onStatusChange('success');
        onComplete();
        return;
      }
    } catch (error) {
      console.error('❌ Payment status query failed:', error);
    }

    // Continue polling
    setAttempts(prev => prev + 1);
    setTimeout(pollPaymentStatus, 5000);
  };

  if (!isPolling) {
    return null;
  }

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}>
      <View
        style={{
          backgroundColor: colors.white,
          padding: 20,
          borderRadius: 10,
          alignItems: 'center',
          minWidth: 200,
        }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text
          style={{
            marginTop: 15,
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.text,
            textAlign: 'center',
          }}>
          Processing Payment...
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center',
          }}>
          Please complete the payment in ZaloPay app
        </Text>
        <Text
          style={{
            marginTop: 5,
            fontSize: 12,
            color: colors.textSecondary,
          }}>
          Attempt {attempts + 1}/{maxAttempts}
        </Text>
      </View>
    </View>
  );
};
