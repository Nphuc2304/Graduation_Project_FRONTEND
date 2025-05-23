import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const ScanDoneScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/icons/back.png')}
            style={styles.iconBack}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Scan Done</Text>
        <View style={{width: 32}} />
      </View>

      <Image
        source={require('../../../assets/icons/id_card.png')}
        style={styles.passportImage}
        resizeMode="contain"
      />

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Họ và tên</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Hoàng Công Nhưt Việt</Text>
        </View>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Năm sinh</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>25/07/2005</Text>
        </View>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Quê quán</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Đăk Lăk</Text>
        </View>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Nơi cư trú</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Đăk Lăk</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Continue with this</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  iconBack: {
    width: 20,
    height: 20,
  },
  backArrow: {
    fontSize: 24,
    color: '#1c1c1c',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1c1c1c',
  },
  passportImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 28,
  },
  infoBlock: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
  },
  infoBox: {
    backgroundColor: '#f0f0f5',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1c',
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: '#1c2d5e',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
