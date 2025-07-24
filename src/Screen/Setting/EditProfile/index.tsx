import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Platform,
  Linking,
  PermissionsAndroid,
  Animated,
} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import {useProfileEditingStyles} from './components/ProfileEditingStyles';
import {UserInfo} from './components/UserInfo';
import {ChevronLeft} from 'lucide-react-native';
import {useTheme} from '../../../utils/ThemeContext';
import {Colors} from '../../../utils/Colors';
import {requestPhotoLibraryPermission} from '../../../utils/permission';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchEditUser,
  fetchEditEmail,
  fetchConfirmEmail,
  fetchUpdateAvatar,
} from '../../../../services/userRedux/userSlice';
import {
  resetStatus,
  resetEditEmailStatus,
  resetConfirmEmailStatus,
  resetUpdateAvatarStatus,
} from '../../../../services/userRedux/userReducer';
import {RootState} from '../../../../services/store/store';

export const EditProfile = ({navigation}: any) => {
  const styles = useProfileEditingStyles();
  const {theme} = useTheme();
  const palette = Colors[theme];
  const dispatch = useDispatch();

  // Helper function to format date for display (avoiding timezone issues)
  const formatDateForDisplay = (dateString: string | Date) => {
    if (!dateString) return '';

    // Convert Date object to string if needed
    let dateStr =
      typeof dateString === 'string' ? dateString : dateString.toISOString();

    // Handle ISO date format (e.g., "2025-01-22T17:00:00.000Z")
    if (dateStr.includes('T') && dateStr.includes('Z')) {
      dateStr = dateStr.split('T')[0]; // Extract just the date part
    }

    // If the date is already in yyyy-MM-dd format, convert it to dd/MM/yyyy
    if (dateStr.includes('-') && dateStr.length === 10) {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    }

    // If it's already in dd/MM/yyyy format, return as is
    if (dateStr.includes('/')) {
      return dateStr;
    }

    // For other formats, try to parse and format
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';

      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      return '';
    }
  };

  // Helper function to format date for API (yyyy-MM-dd format)
  const formatDateForAPI = (dateString: string) => {
    if (!dateString) return '';

    // If already in yyyy-MM-dd format, return as is
    if (dateString.includes('-') && dateString.length === 10) {
      return dateString;
    }

    // If in dd/MM/yyyy format, convert to yyyy-MM-dd
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    return dateString;
  };

  // Get user data from Redux store
  const {
    user,
    isLoading,
    isSuccess,
    isError,
    errorMessage,
    isLoadingEditEmail,
    isErrorEditEmail,
    errorMessageEditEmail,
    isLoadingConfirmEmail,
    isErrorConfirmEmail,
    errorMessageConfirmEmail,
    isLoadingUpdateAvatar,
    isErrorUpdateAvatar,
    errorMessageUpdateAvatar,
  } = useSelector((state: RootState) => state.user);

  // Local state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '', // Add password field
    dateOfBirth: '',
    phoneNum: '',
    address: '',
  });

  // Email change state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [emailToken, setEmailToken] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isEmailChangeInProgress, setIsEmailChangeInProgress] = useState(false);

  // Avatar upload loading state
  const [showAvatarLoadingModal, setShowAvatarLoadingModal] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;

  // Animation functions
  const startSpinningAnimation = () => {
    spinValue.setValue(0);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  };

  const stopSpinningAnimation = () => {
    spinValue.stopAnimation();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        username: user.username || '',
        email: user.email || '',
        password: '', // Password is not pre-filled for security
        dateOfBirth: user.dateOfBirth
          ? formatDateForDisplay(user.dateOfBirth)
          : '',
        phoneNum: user.phoneNum || '',
        address: user.address || '',
      });
    }
  }, [user]);

  // Debug function to check all permissions
  const debugPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const androidVersion = Platform.Version;
        console.log('=== DEBUG PERMISSIONS ===');
        console.log('Android version:', androidVersion);

        if (androidVersion >= 33) {
          const hasReadMediaImages = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          );
          console.log('READ_MEDIA_IMAGES granted:', hasReadMediaImages);
        }

        const hasReadExternalStorage = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        console.log('READ_EXTERNAL_STORAGE granted:', hasReadExternalStorage);

        const hasWriteExternalStorage = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        console.log('WRITE_EXTERNAL_STORAGE granted:', hasWriteExternalStorage);
        console.log('=== END DEBUG ===');
      } catch (error) {
        console.log('Error checking permissions:', error);
      }
    }
  };

  // Handle image picker
  const handleImagePicker = async () => {
    try {
      console.log('Starting image picker process...');

      // Debug permissions first
      await debugPermissions();

      // Request permission first
      const hasPermission = await requestPhotoLibraryPermission();
      console.log('Photo library permission result:', hasPermission);

      if (!hasPermission) {
        Alert.alert(
          'Lỗi',
          'Cần quyền truy cập thư viện ảnh để thay đổi ảnh đại diện. Vui lòng cấp quyền trong Cài đặt.',
          [
            {
              text: 'Hủy',
              style: 'cancel',
            },
            {
              text: 'Cài đặt',
              onPress: () => {
                // Try to open app settings
                if (Platform.OS === 'ios') {
                  Linking.openURL('app-settings:');
                } else {
                  Linking.openSettings();
                }
              },
            },
          ],
        );
        return;
      }

      const options = {
        mediaType: 'photo' as MediaType,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        quality: 0.8 as const,
        selectionLimit: 1,
      };

      console.log('Launching image library with options:', options);

      launchImageLibrary(options, (response: ImagePickerResponse) => {
        console.log('Image picker response:', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log(
            'Image picker error:',
            response.errorCode,
            response.errorMessage,
          );
          Alert.alert(
            'Lỗi',
            `Không thể truy cập thư viện ảnh: ${
              response.errorMessage || response.errorCode
            }`,
          );
        } else if (response.assets && response.assets[0]) {
          const imageUri = response.assets[0].uri;
          console.log('Selected image URI:', imageUri);

          if (imageUri) {
            // Store the selected image file for immediate upload
            const file = {
              uri: imageUri,
              type: response.assets[0].type || 'image/jpeg',
              name: response.assets[0].fileName || 'avatar.jpg',
            };

            // Upload avatar immediately
            handleAvatarUpload(file);
          }
        } else {
          console.log('No image selected or assets array is empty');
        }
      });
    } catch (error) {
      console.error('Error in handleImagePicker:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi truy cập thư viện ảnh');
    }
  };

  // Handle avatar upload
  const handleAvatarUpload = async (file: any) => {
    try {
      console.log('🖼️ Starting avatar upload with file:', file);

      // Show loading modal and start spinning animation
      setShowAvatarLoadingModal(true);
      startSpinningAnimation();

      const result = await dispatch(fetchUpdateAvatar({avatar: file}) as any);

      if (fetchUpdateAvatar.fulfilled.match(result)) {
        console.log('✅ Avatar upload successful:', result.payload);
        Alert.alert('Thành công', 'Cập nhật ảnh đại diện thành công');
      } else {
        console.log('❌ Avatar upload failed:', result.error);
      }
      // Error handling is done in useEffect
    } catch (error) {
      console.error('❌ Error uploading avatar:', error);
      Alert.alert('Lỗi', 'Cập nhật ảnh đại diện thất bại');
    } finally {
      // Hide loading modal and stop animation
      setShowAvatarLoadingModal(false);
      stopSpinningAnimation();
    }
  };

  // Handle form field changes
  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle email change
  const handleEmailChange = async (email: string) => {
    if (!email.trim()) return;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Lỗi', 'Email không đúng định dạng');
      return;
    }

    setIsEmailChangeInProgress(true);
    const result = await dispatch(fetchEditEmail({email}) as any);

    if (fetchEditEmail.fulfilled.match(result)) {
      setEmailToken(result.payload.emailToken);
      setShowEmailModal(true);
    }
    // Error handling is done in useEffect
  };

  // Handle email confirmation
  const handleEmailConfirmation = async () => {
    if (!confirmationCode.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập mã xác nhận');
      return;
    }

    const result = await dispatch(
      fetchConfirmEmail({
        emailToken,
        confirmationCode: confirmationCode.trim(),
      }) as any,
    );

    if (fetchConfirmEmail.fulfilled.match(result)) {
      setShowEmailModal(false);
      setConfirmationCode('');
      setEmailToken('');
      setNewEmail('');

      // Continue with saving other user data
      const success = await saveUserData();
      setIsEmailChangeInProgress(false);

      // If save was successful, show success message and exit edit mode
      if (success) {
        Alert.alert('Thành công', 'Cập nhật thông tin thành công', [
          {
            text: 'OK',
            onPress: () => {
              setIsEditing(false);
              dispatch(resetStatus());
            },
          },
        ]);
      }
    }
    // Error handling is done in useEffect
  };

  // Save user data (excluding email which is handled separately)
  const saveUserData = async () => {
    if (!user) {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng');
      return false;
    }

    // Validate required fields
    if (!formData.username.trim()) {
      Alert.alert('Lỗi', 'Tên tài khoản không được để trống');
      return false;
    }

    // Validate email format
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        Alert.alert('Lỗi', 'Email không đúng định dạng');
        return false;
      }
    }

    // Validate password if provided
    if (formData.password && !validatePassword(formData.password)) {
      Alert.alert(
        'Lỗi',
        'Mật khẩu phải có ít nhất 8 ký tự và chứa cả chữ cái và số',
      );
      return false;
    }

    try {
      // Use the helper function to format date for API
      const dateOfBirth = formatDateForAPI(formData.dateOfBirth);

      const editData: any = {
        fullName: formData.fullName,
        username: formData.username,
        // Email is handled separately through confirmation flow
        dateOfBirth: dateOfBirth,
        phoneNum: formData.phoneNum,
        address: formData.address,
      };

      // Only include password if it's provided
      if (formData.password.trim()) {
        editData.password = formData.password;
      }

      // Avatar is handled separately through handleAvatarUpload

      const result = await dispatch(fetchEditUser(editData) as any);
      return fetchEditUser.fulfilled.match(result);
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
    }
  };

  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset form data
      if (user) {
        setFormData({
          fullName: user.fullName || '',
          username: user.username || '',
          email: user.email || '',
          password: '', // Reset password field
          dateOfBirth: user.dateOfBirth
            ? formatDateForDisplay(user.dateOfBirth)
            : '',
          phoneNum: user.phoneNum || '',
          address: user.address || '',
        });
      }
    }
    setIsEditing(!isEditing);
  };

  // Validate password
  const validatePassword = (password: string) => {
    if (!password) return true; // Password is optional for editing
    if (password.length < 8) {
      return false;
    }
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasLetter && hasNumber;
  };

  // Handle save
  const handleSave = async () => {
    if (!user) {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng');
      return;
    }

    // Check if email has changed
    if (formData.email !== user.email) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        Alert.alert('Lỗi', 'Email không đúng định dạng');
        return;
      }

      // Start email change flow
      setNewEmail(formData.email);
      handleEmailChange(formData.email);
      return;
    }

    // If email hasn't changed, save other data directly
    setIsEmailChangeInProgress(false);

    const success = await saveUserData();

    // If save was successful, show success message and exit edit mode
    if (success) {
      Alert.alert('Thành công', 'Cập nhật thông tin thành công', [
        {
          text: 'OK',
          onPress: () => {
            setIsEditing(false);
            dispatch(resetStatus());
          },
        },
      ]);
    }
  };

  // Handle API response - only for cases not handled in handleSave/handleEmailConfirmation
  useEffect(() => {
    if (isSuccess && !isEmailChangeInProgress && !isEditing) {
      // This handles cases where the API call was successful but we're not in edit mode
      // (e.g., from other parts of the app)
      dispatch(resetStatus());
    }
  }, [isSuccess, isEmailChangeInProgress, isEditing, dispatch]);

  useEffect(() => {
    if (isError) {
      Alert.alert('Lỗi', errorMessage || 'Cập nhật thông tin thất bại');
      dispatch(resetStatus());
      setIsEmailChangeInProgress(false);
      // Don't reset isEditing here - let user decide whether to continue editing or cancel
    }
  }, [isError, errorMessage, dispatch]);

  // Handle email edit errors
  useEffect(() => {
    if (isErrorEditEmail) {
      Alert.alert('Lỗi', errorMessageEditEmail || 'Gửi mã xác nhận thất bại');
      dispatch(resetEditEmailStatus());
      setIsEmailChangeInProgress(false);
    }
  }, [isErrorEditEmail, errorMessageEditEmail, dispatch]);

  useEffect(() => {
    if (isErrorConfirmEmail) {
      Alert.alert('Lỗi', errorMessageConfirmEmail || 'Xác nhận email thất bại');
      dispatch(resetConfirmEmailStatus());
      setIsEmailChangeInProgress(false);
    }
  }, [isErrorConfirmEmail, errorMessageConfirmEmail, dispatch]);

  // Handle avatar upload errors
  useEffect(() => {
    if (isErrorUpdateAvatar) {
      Alert.alert(
        'Lỗi',
        errorMessageUpdateAvatar || 'Cập nhật ảnh đại diện thất bại',
      );
      dispatch(resetUpdateAvatarStatus());
      // Hide loading modal on error
      setShowAvatarLoadingModal(false);
      stopSpinningAnimation();
    }
  }, [isErrorUpdateAvatar, errorMessageUpdateAvatar, dispatch]);

  // Update form data when user data changes (after successful edit)
  useEffect(() => {
    if (user && !isEditing) {
      setFormData({
        fullName: user.fullName || '',
        username: user.username || '',
        email: user.email || '',
        password: '', // Reset password field after successful edit
        dateOfBirth: user.dateOfBirth
          ? formatDateForDisplay(user.dateOfBirth)
          : '',
        phoneNum: user.phoneNum || '',
        address: user.address || '',
      });
    }
  }, [user, isEditing]);

  // Create rows data for UserInfo component
  const createUserInfoRows = () => {
    const rows = [
      {
        label: 'Tên người dùng',
        value: formData.fullName,
        placeholder: 'Chưa cập nhật',
        type: 'text' as const,
        editable: isEditing,
        onChangeText: (text: string) => handleFieldChange('fullName', text),
        maxLength: 50,
      },
      {
        label: 'Tên tài khoản*',
        value: formData.username,
        placeholder: 'Chưa cập nhật',
        type: 'text' as const,
        editable: false,
        maxLength: 30,
      },
      {
        label: 'Email*',
        value: formData.email,
        placeholder: 'Chưa cập nhật',
        type: 'text' as const,
        editable: isEditing,
        onChangeText: (text: string) => handleFieldChange('email', text),
        keyboardType: 'email-address' as const,
        autoCapitalize: 'none' as const,
      },
      {
        label: 'Mật khẩu mới',
        value: formData.password,
        placeholder: 'Để trống nếu không thay đổi',
        type: 'text' as const,
        editable: isEditing,
        onChangeText: (text: string) => handleFieldChange('password', text),
        secureTextEntry: true,
      },
      {
        label: 'Ngày sinh',
        value: formData.dateOfBirth,
        placeholder: 'dd/MM/yyyy',
        type: 'date' as const,
        editable: isEditing,
        onChangeText: (text: string) => handleFieldChange('dateOfBirth', text),
      },
      {
        label: 'Số điện thoại',
        value: formData.phoneNum,
        placeholder: 'VD: 0123456789 hoặc +84123456789',
        type: 'text' as const,
        editable: isEditing,
        onChangeText: (text: string) => handleFieldChange('phoneNum', text),
        maxLength: 12,
        keyboardType: 'phone-pad' as const,
      },
      {
        label: 'Địa chỉ',
        value: formData.address,
        placeholder: 'Chọn tỉnh/thành phố',
        type: 'address' as const,
        editable: isEditing,
        onChangeText: (text: string) => handleFieldChange('address', text),
      },
      {
        label: 'Credit *',
        value: user?.credit?.toString() || '0',
        placeholder: '0',
        type: 'text' as const,
        editable: false,
      },
      {
        label: 'Trạng thái KYC*',
        value: user?.isKYC ? 'Đã xác thực' : 'Chưa xác thực',
        placeholder: 'Chưa xác thực',
        type: 'text' as const,
        editable: false,
      },
    ];

    return rows;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={35} color={palette.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chỉnh sửa hồ sơ</Text>
        {isEditing ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={handleEditToggle}
              style={{marginRight: 10}}
              disabled={isLoading}>
              <Text style={[styles.headerText, {color: '#FF6B6B'}]}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              disabled={
                isLoading || isLoadingEditEmail || isLoadingUpdateAvatar
              }>
              <Text
                style={[
                  styles.headerText,
                  {
                    color:
                      isLoading || isLoadingEditEmail || isLoadingUpdateAvatar
                        ? '#999'
                        : '#3897F0',
                  },
                ]}>
                {isLoading
                  ? 'Đang lưu...'
                  : isLoadingEditEmail
                  ? 'Đang gửi mã...'
                  : isLoadingUpdateAvatar
                  ? 'Đang tải ảnh...'
                  : 'Lưu'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleEditToggle}>
            <Text style={[styles.headerText, {color: '#3897F0'}]}>Sửa</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView>
        <View>
          <View style={styles.profileSection}>
            <View style={{position: 'relative'}}>
              <Image
                source={
                  user?.avatarImg
                    ? {uri: user.avatarImg}
                    : {uri: 'https://via.placeholder.com/95'}
                }
                style={styles.avatar}
              />
            </View>
            <TouchableOpacity onPress={handleImagePicker}>
              <Text style={styles.changeText}>Thay đổi ảnh đại diện</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <UserInfo rows={createUserInfoRows()} />
          </View>
        </View>
      </ScrollView>

      {/* Email Confirmation Modal */}
      <Modal
        visible={showEmailModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEmailModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Xác nhận Email</Text>
            <Text style={styles.modalSubtitle}>
              Mã xác nhận đã được gửi đến {newEmail}
            </Text>

            <TextInput
              style={styles.confirmationInput}
              placeholder="Nhập mã xác nhận"
              value={confirmationCode}
              onChangeText={setConfirmationCode}
              keyboardType="numeric"
              maxLength={6}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowEmailModal(false);
                  setConfirmationCode('');
                  setEmailToken('');
                  setNewEmail('');
                }}
                disabled={isLoadingConfirmEmail}>
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleEmailConfirmation}
                disabled={isLoadingConfirmEmail}>
                <Text style={styles.confirmButtonText}>
                  {isLoadingConfirmEmail ? 'Đang xác nhận...' : 'Xác nhận'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Avatar Upload Loading Modal */}
      <Modal
        visible={showAvatarLoadingModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Đang tải ảnh lên</Text>
            <Text style={styles.modalSubtitle}>
              Vui lòng chờ trong khi chúng tôi đang xử lý ảnh của bạn...
            </Text>

            {/* Loading indicator */}
            <View style={styles.loadingContainer}>
              <Animated.View
                style={[styles.loadingSpinner, {transform: [{rotate: spin}]}]}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EditProfile;
