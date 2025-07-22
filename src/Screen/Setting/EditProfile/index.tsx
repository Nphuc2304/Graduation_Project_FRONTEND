import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useProfileEditingStyles} from './components/ProfileEditingStyles';
import {UserInfo} from './components/UserInfo';
import {ChevronLeft} from 'lucide-react-native';
import {useTheme} from '../../../utils/ThemeContext';
import {Colors} from '../../../utils/Colors';

export const EditProfile = ({navigation}: any) => {
  const styles = useProfileEditingStyles();
  const {theme} = useTheme();
  const palette = Colors[theme];

  // Mock user data for UI display
  const mockUser = {
    fullName: 'Nguyễn Văn A',
    username: 'nguyenvana',
    email: 'nguyenvana@example.com',
    dateOfBirth: '01/01/1990',
    phoneNum: '0123456789',
    address: 'Hà Nội, Việt Nam',
    avatarImg: 'https://via.placeholder.com/95',
    credit: 1000,
    isKYC: true,
  };

  // Mock form data
  const formData = {
    fullName: mockUser.fullName,
    username: mockUser.username,
    email: mockUser.email,
    dateOfBirth: mockUser.dateOfBirth,
    phoneNum: mockUser.phoneNum,
    address: mockUser.address,
  };

  // Mock editing state
  const isEditing = false;
  const isLoading = false;

  // Create rows data for UserInfo component
  const createUserInfoRows = () => {
    const rows = [
      {
        label: 'Tên người dùng',
        value: formData.fullName,
        placeholder: 'Chưa cập nhật',
        type: 'text' as const,
        editable: isEditing,
        onChangeText: () => {},
        maxLength: 50,
      },
      {
        label: 'Tên tài khoản*',
        value: formData.username,
        placeholder: 'Chưa cập nhật',
        type: 'text' as const,
        editable: isEditing,
        onChangeText: () => {},
        maxLength: 30,
        autoCapitalize: 'none' as const,
      },
      {
        label: 'Email*',
        value: formData.email,
        placeholder: 'Chưa cập nhật',
        type: 'text' as const,
        editable: isEditing,
        onChangeText: () => {},
        keyboardType: 'email-address' as const,
        autoCapitalize: 'none' as const,
      },
      {
        label: 'Ngày sinh',
        value: formData.dateOfBirth,
        placeholder: 'dd/MM/yyyy',
        type: 'date' as const,
        editable: isEditing,
        onChangeText: () => {},
      },
      {
        label: 'Số điện thoại',
        value: formData.phoneNum,
        placeholder: 'VD: 0123456789 hoặc +84123456789',
        type: 'text' as const,
        editable: isEditing,
        onChangeText: () => {},
        maxLength: 12,
        keyboardType: 'phone-pad' as const,
      },
      {
        label: 'Địa chỉ',
        value: formData.address,
        placeholder: 'Chưa cập nhật',
        type: 'text' as const,
        editable: isEditing,
        onChangeText: () => {},
      },
      {
        label: 'Credit',
        value: mockUser.credit?.toString(),
        placeholder: '0',
        type: 'text' as const,
        editable: false,
      },
      {
        label: 'Trạng thái KYC',
        value: mockUser.isKYC ? 'Đã xác thực' : 'Chưa xác thực',
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
              onPress={() => {}}
              style={{marginRight: 10}}
              disabled={isLoading}>
              <Text style={[styles.headerText, {color: '#FF6B6B'}]}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} disabled={isLoading}>
              <Text
                style={[
                  styles.headerText,
                  {color: isLoading ? '#999' : '#3897F0'},
                ]}>
                {isLoading ? 'Đang lưu...' : 'Lưu'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.headerText, {color: '#3897F0'}]}>Sửa</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView>
        <View>
          <View style={styles.profileSection}>
            <Image
              source={
                mockUser.avatarImg
                  ? {uri: mockUser.avatarImg}
                  : {uri: 'https://via.placeholder.com/95'}
              }
              style={styles.avatar}
            />
            <TouchableOpacity disabled={!isEditing}>
              <Text style={[styles.changeText, !isEditing && {opacity: 0.5}]}>
                Thay đổi ảnh đại diện
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <UserInfo rows={createUserInfoRows()} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
