import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
  StatusBar,
  Alert,
} from 'react-native';
import {
  ChevronLeft,
  ChevronRight,
  User,
  Shield,
  Bell,
  Headphones,
  Users,
  Moon,
  LogOut,
} from 'lucide-react-native';
import {clearTokens, clearLoginCredentials} from '../../utils/tokenStorage';
import {useDispatch} from 'react-redux';
import {resetUser} from '../../../services/userRedux/userReducer';
import {useTheme} from '../../utils/ThemeContext';
import {ThemeToggle} from '../../../components/ThemeToggle';

export const Setting = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {theme, colors, toggleTheme} = useTheme();

  const menuItems = [
    {
      icon: User,
      label: 'Edit Profile',
      hasChevron: true,
      iconBg: '#E3F2FD',
      iconColor: '#1976D2',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      icon: Shield,
      label: 'Security',
      hasChevron: true,
      iconBg: '#E3F2FD',
      iconColor: '#1976D2',
    },
    {
      icon: Bell,
      label: 'Notifications',
      hasChevron: true,
      iconBg: '#E3F2FD',
      iconColor: '#1976D2',
    },
    {
      icon: Headphones,
      label: 'Help',
      hasChevron: true,
      iconBg: '#E3F2FD',
      iconColor: '#1976D2',
    },
    {
      icon: Users,
      label: 'Invite Friends',
      hasChevron: true,
      iconBg: '#E3F2FD',
      iconColor: '#1976D2',
    },
  ];

  const handleMenuPress = (label: string) => {
    console.log(`${label} pressed`);
    // Add navigation logic here
  };

  const handleLogout = async () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Đăng xuất',
        style: 'destructive',
        onPress: async () => {
          try {
            // Reset Redux state trước
            dispatch(resetUser());

            // Xóa tokens và thông tin đăng nhập đã lưu
            await clearTokens();
            await clearLoginCredentials();

            console.log(
              '✅ Đăng xuất thành công - Redux state và tokens đã được xóa',
            );

            // Chuyển về màn hình đăng nhập
            navigation.reset({
              index: 0,
              routes: [{name: 'SignIn'}],
            });
          } catch (error) {
            console.error('❌ Lỗi khi đăng xuất:', error);
            Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Header */}
      <View style={[styles.header, {borderBottomColor: colors.border}]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: colors.text}]}>Setting</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => item.onPress?.()}
            activeOpacity={0.7}>
            <View
              style={[styles.iconContainer, {backgroundColor: item.iconBg}]}>
              <item.icon size={20} color={item.iconColor} />
            </View>
            <Text style={[styles.menuLabel, {color: colors.text}]}>
              {item.label}
            </Text>
            {item.hasChevron && (
              <ChevronRight size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        ))}

        {/* Dark Mode Toggle */}
        <View style={styles.menuItem}>
          <View style={[styles.iconContainer, {backgroundColor: '#E3F2FD'}]}>
            <Moon size={20} color="#1976D2" />
          </View>
          <ThemeToggle showLabel={false} size="medium" />
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleLogout}
          activeOpacity={0.7}>
          <View style={[styles.iconContainer, {backgroundColor: '#FFEBEE'}]}>
            <LogOut size={20} color="#D32F2F" />
          </View>
          <Text style={[styles.menuLabel, {color: '#D32F2F'}]}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Home Indicator */}
      <View style={styles.homeIndicator}>
        <View style={[styles.indicator, {backgroundColor: colors.text}]} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  homeIndicator: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  indicator: {
    width: 134,
    height: 5,
    borderRadius: 2.5,
  },
});
