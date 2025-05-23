import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export const InfoVerification = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Verification</Text>

      <View style={styles.card}>
        <Image
          source={require('../../../assets/icons/user.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.description}>
          Selfie with your front camera to verify your identity
        </Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Image
            source={require('../../../assets/icons/ghim_icon.png')}
            style={styles.uploadIcon}
          />
          <View>
            <Text style={styles.uploadTitle}>Selfie Photo</Text>
            <Text style={styles.uploadSubtitle}>Upload</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Image
          source={require('../../../assets/icons/id_card.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.description}>
          Take a passport or ID to check your information
        </Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Image
            source={require('../../../assets/icons/ghim_icon.png')}
            style={styles.uploadIcon}
          />
          <View>
            <Text style={styles.uploadTitle}>Passport scan</Text>
            <Text style={styles.uploadSubtitle}>Upload</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Submit all</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fa',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1c1c1c',
    marginBottom: 20,
  },
  card: {
    position: 'relative',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
    marginTop: 30,
  },
  icon: {
    width: 72,
    height: 72,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1c1c1c',
    marginBottom: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f5',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
  },
  uploadIcon: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1c1c',
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  submitButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 60,
    marginTop: 50,
  },
  submitText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
