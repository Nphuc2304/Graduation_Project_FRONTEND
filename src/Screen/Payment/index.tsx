import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import PaymentStyles from '../../Styles/PaymentStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../services/store/store';
import {ZaloPayService} from '../../../services/zalopayService';
import {useTheme} from '../../utils/ThemeContext';
import {fetchMe} from '../../../services/userRedux/userSlice';
import {AppDispatch} from '../../../services/store/store';

const paymentMethods = [
  {
    id: 1,
    name: 'ZaloPay',
    logo: require('../../../assets/images/imgBankO.png'),
    method: 'ZALOPAY',
    description: 'Thanh toán qua ZaloPay',
    available: true,
  },
  {
    id: 2,
    name: 'Wave Pay',
    logo: require('../../../assets/images/imgBankT.png'),
    method: 'WAVE',
    description: 'Thanh toán qua Wave Pay',
    available: false,
  },
];

export const Payment = () => {
  const [selectedID, setSelectedID] = useState<number | null>(null);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<
    'pending' | 'success' | 'failed'
  >('pending');
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {user, isLoadingMe} = useSelector((state: RootState) => state.user);
  const {currentCampaign, isLoadingGetById} = useSelector(
    (state: RootState) => state.campaigns,
  );
  const {colors} = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  // Get donation data from route params
  const {
    amount,
    campaignId: routeCampaignId,
    campaignName,
    isAnonymous = false,
    description,
  } = route.params || {};

  // Use campaignId from route params or fallback to currentCampaign
  const campaignId = routeCampaignId || currentCampaign?._id;

  useEffect(() => {
    // Auto-select ZaloPay as default payment method
    setSelectedID(1);
  }, []);

  useEffect(() => {
    if (!user?._id) {
      dispatch(fetchMe());
    }
  }, [user?._id, dispatch]);

  // Debug useEffect to check user and campaign data
  useEffect(() => {
    console.log('🔍 Payment Screen Debug:');
    console.log('user state:', user);
    console.log('route params:', route.params);
    console.log('routeCampaignId:', routeCampaignId);
    console.log('currentCampaign:', currentCampaign);
    console.log('final campaignId:', campaignId);
    console.log('isLoadingMe:', isLoadingMe);
    console.log('isLoadingGetById:', isLoadingGetById);
  }, [
    user,
    route.params,
    routeCampaignId,
    currentCampaign,
    campaignId,
    isLoadingMe,
    isLoadingGetById,
  ]);

  // Check if data is ready
  useEffect(() => {
    const isUserReady = user?._id && !isLoadingMe;
    const isCampaignReady = campaignId && !isLoadingGetById;

    console.log('📊 Data Ready Check:');
    console.log('isUserReady:', isUserReady);
    console.log('isCampaignReady:', isCampaignReady);

    setIsDataLoading(!isUserReady || !isCampaignReady);
  }, [user?._id, campaignId, isLoadingMe, isLoadingGetById]);

  const handlePayment = async () => {
    if (!selectedID) {
      Alert.alert('Lỗi', 'Vui lòng chọn phương thức thanh toán');
      return;
    }

    if (!amount || amount < 1000) {
      Alert.alert('Lỗi', 'Số tiền tối thiểu là 1,000 VND');
      return;
    }

    // Debug logs to check values
    console.log('🔍 Debug Payment Validation:');
    console.log('campaignId:', campaignId);
    console.log('user:', user);
    console.log('user._id:', user?._id);
    console.log('currentCampaign from route params:', route.params);

    if (!campaignId || !user?._id) {
      let errorMessage = 'Thiếu thông tin: ';
      if (!campaignId) {
        errorMessage += 'chiến dịch ';
      }
      if (!user?._id) {
        errorMessage += 'người dùng ';
      }
      errorMessage += 'vui lòng thử lại';

      Alert.alert('Lỗi', errorMessage);
      return;
    }

    const selectedMethod = paymentMethods.find(
      method => method.id === selectedID,
    );
    if (!selectedMethod) {
      Alert.alert('Lỗi', 'Phương thức thanh toán không hợp lệ');
      return;
    }

    if (selectedMethod.method === 'ZALOPAY') {
      await handleZaloPayPayment();
    } else {
      Alert.alert('Sắp có', 'Phương thức thanh toán này sẽ có sẵn sớm');
    }
  };

  const handleZaloPayPayment = async () => {
    setIsLoading(true);
    try {
      console.log('🚀 Starting ZaloPay payment process...');

      const paymentData = {
        amount: amount,
        description:
          description ||
          `Quyên góp cho ${campaignName || 'chiến dịch từ thiện'}`,
        donorId: user?._id || '',
        campaignId: campaignId,
        donorName: (user as any)?.name || user?.email || 'Anonymous',
        isAnonymous: isAnonymous,
        redirectUrl: 'your-app-scheme://payment-callback', // Replace with your app's deep link
      };

      console.log('📋 Payment data:', paymentData);

      const response = await ZaloPayService.createPayment(paymentData);

      if (response.return_code === 1 && response.order_url) {
        console.log('✅ ZaloPay order created successfully');
        console.log('🔗 Order URL:', response.order_url);

        // Open ZaloPay payment URL
        const canOpen = await Linking.canOpenURL(response.order_url);
        if (canOpen) {
          await Linking.openURL(response.order_url);

          // Show success modal
          setPaymentStatus('success');
          setIsModal(true);

          // Start polling for payment status
          if (response.app_trans_id) {
            startPaymentStatusPolling(response.app_trans_id);
          }
        } else {
          Alert.alert(
            'Lỗi URL Thanh toán',
            'Không thể mở ZaloPay. Vui lòng thử lại.',
            [{text: 'OK', onPress: () => setIsLoading(false)}],
          );
        }
      } else {
        console.error('❌ ZaloPay order creation failed:', response);
        setPaymentStatus('failed');
        setIsModal(true);
      }
    } catch (error: any) {
      console.error('❌ Payment error:', error);

      let errorMessage = 'Thanh toán thất bại. Vui lòng thử lại.';
      if (error.response?.data?.return_message) {
        errorMessage = error.response.data.return_message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Lỗi Thanh toán', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const startPaymentStatusPolling = async (appTransId: string) => {
    if (!appTransId) return;

    console.log('🔄 Starting payment status polling for:', appTransId);

    // Poll every 5 seconds for up to 5 minutes
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes with 5-second intervals

    const pollInterval = setInterval(async () => {
      attempts++;

      try {
        const queryResponse = await ZaloPayService.queryPayment(appTransId);

        if (queryResponse.return_code === 1) {
          console.log('✅ Payment confirmed:', queryResponse);
          clearInterval(pollInterval);

          // Update UI to show success
          setPaymentStatus('success');
          setIsModal(true);
        } else if (attempts >= maxAttempts) {
          console.log('⏰ Payment polling timeout');
          clearInterval(pollInterval);

          // Show timeout message
          Alert.alert(
            'Trạng thái thanh toán',
            'Thanh toán đang được xử lý. Vui lòng kiểm tra ứng dụng ZaloPay để xác nhận.',
            [{text: 'OK'}],
          );
        }
      } catch (error) {
        console.error('❌ Payment status query failed:', error);

        if (attempts >= maxAttempts) {
          clearInterval(pollInterval);
          Alert.alert(
            'Trạng thái thanh toán',
            'Không thể xác minh trạng thái thanh toán. Vui lòng kiểm tra ứng dụng ZaloPay.',
            [{text: 'OK'}],
          );
        }
      }
    }, 5000);
  };

  const handleModalClose = () => {
    setIsModal(false);
    if (paymentStatus === 'success') {
      // Navigate back to campaign detail or home
      navigation.navigate('Detail', {campaignId});
    }
  };

  const getModalContent = () => {
    switch (paymentStatus) {
      case 'success':
        return {
          image: require('../../../assets/images/successfully.png'),
          title: 'Thanh toán thành công',
          message: 'Cảm ơn bạn đã quyên góp!',
          buttonText: 'OK',
        };
      case 'failed':
        return {
          image: require('../../../assets/images/Error.png'),
          title: 'Thanh toán thất bại',
          message: 'Vui lòng thử lại hoặc chọn phương thức thanh toán khác.',
          buttonText: 'Thử lại',
        };
      default:
        return {
          image: require('../../../assets/images/successfully.png'),
          title: 'Đang xử lý thanh toán',
          message: 'Vui lòng hoàn thành thanh toán trong ứng dụng ZaloPay.',
          buttonText: 'OK',
        };
    }
  };

  const modalContent = getModalContent();

  return (
    <View style={PaymentStyles.container}>
      <View style={PaymentStyles.rowContainerSpace}>
        <TouchableOpacity
          style={PaymentStyles.backBox}
          onPress={() => navigation.goBack()}
          disabled={isLoading}>
          <Image
            source={require('../../../assets/icons/back.png')}
            style={PaymentStyles.iconback}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={PaymentStyles.textL}>Thanh toán</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PaymentStyles.moreBox}>
          <Image
            source={require('../../../assets/icons/more_vertical.png')}
            style={PaymentStyles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={[PaymentStyles.container, {paddingHorizontal: 25}]}>
        <Text style={[PaymentStyles.textL, {marginVertical: 30}]}>
          Chọn phương thức thanh toán
        </Text>
        <Text
          style={[
            PaymentStyles.textL,
            {
              fontSize: 14,
              color: colors.textSecondary,
              marginBottom: 20,
              textAlign: 'center',
            },
          ]}>
          ZaloPay đã được chọn mặc định
        </Text>

        {amount && (
          <View
            style={{
              marginBottom: 20,
              padding: 15,
              backgroundColor: colors.backgroundSecondary,
              borderRadius: 10,
            }}>
            <Text
              style={[
                PaymentStyles.textL,
                {color: colors.primary, fontWeight: 'bold'},
              ]}>
              Số tiền quyên góp: {amount.toLocaleString()} VND
            </Text>
            {campaignName && (
              <Text style={[PaymentStyles.textL, {marginTop: 5, fontSize: 14}]}>
                Chiến dịch: {campaignName}
              </Text>
            )}
            <Text
              style={[
                PaymentStyles.textL,
                {marginTop: 5, fontSize: 12, color: colors.textSecondary},
              ]}>
              {isAnonymous ? 'Quyên góp ẩn danh' : 'Quyên góp công khai'}
            </Text>
          </View>
        )}

        <View>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              onPress={() => method.available && setSelectedID(method.id)}
              style={[
                PaymentStyles.methodContainer,
                selectedID === method.id && PaymentStyles.selectMethodContainer,
                !method.available && {opacity: 0.5},
              ]}
              disabled={isLoading || !method.available}>
              <View style={PaymentStyles.leftContainer}>
                <Image source={method.logo} style={PaymentStyles.imgBank} />
                <View style={{flex: 1}}>
                  <Text
                    style={[
                      PaymentStyles.textL,
                      {
                        color: method.available
                          ? colors.text
                          : colors.textSecondary,
                      },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {method.name}
                  </Text>
                  <Text
                    style={[
                      PaymentStyles.textL,
                      {
                        fontSize: 12,
                        color: colors.textSecondary,
                        marginTop: 2,
                      },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {method.description}
                  </Text>
                </View>
              </View>
              <View style={PaymentStyles.radioBtn}>
                {selectedID === method.id && method.available && (
                  <View style={PaymentStyles.radioInner} />
                )}
                {!method.available && (
                  <Text style={{fontSize: 10, color: colors.textSecondary}}>
                    Sắp có
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{backgroundColor: colors.white}}>
        <TouchableOpacity
          style={[
            PaymentStyles.btn,
            (isLoading || isDataLoading) && {opacity: 0.6},
          ]}
          onPress={handlePayment}
          disabled={isLoading || isDataLoading}>
          {isLoading ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ActivityIndicator
                size="small"
                color={colors.white}
                style={{marginRight: 10}}
              />
              <Text style={[PaymentStyles.textL, {color: colors.white}]}>
                Đang xử lý...
              </Text>
            </View>
          ) : isDataLoading ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ActivityIndicator
                size="small"
                color={colors.white}
                style={{marginRight: 10}}
              />
              <Text style={[PaymentStyles.textL, {color: colors.white}]}>
                Đang tải dữ liệu...
              </Text>
            </View>
          ) : (
            <Text style={[PaymentStyles.textL, {color: colors.white}]}>
              Thanh toán qua ZaloPay
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal transparent={true} animationType="fade" visible={isModal}>
        <View style={PaymentStyles.modal}>
          <View style={PaymentStyles.modalContainer}>
            <Image
              source={modalContent.image}
              style={PaymentStyles.imgSuccess}
            />
            <Text style={PaymentStyles.textSuccess}>{modalContent.title}</Text>
            <Text style={PaymentStyles.textThank}>{modalContent.message}</Text>
            <TouchableOpacity
              style={PaymentStyles.btnOK}
              onPress={handleModalClose}>
              <Text style={[PaymentStyles.textL, {color: colors.white}]}>
                {modalContent.buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
