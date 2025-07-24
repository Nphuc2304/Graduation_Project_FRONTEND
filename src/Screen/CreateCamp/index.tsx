import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ChevronLeft, Plus, Calendar, Save, Send} from 'lucide-react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../../services/store/store';
import {fetchCreateCampaign} from '../../../services/campaignRedux/campaignSlice';
import {fetchMe} from '../../../services/userRedux/userSlice';
import {CampaignState} from '../../../services/campaignRedux/campaignTypes';
import { resetCreateStatus } from '../../../services/campaignRedux';
import {User} from '../../../services/userRedux/userTypes'

const CreateCampaignScreen = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const user = useSelector((state: RootState) => state.user.user);
  const isLoadingMe = useSelector((state: RootState) => state.user.isLoadingMe);
    
  const isLoadingCreate = useSelector(
    (state: RootState) => state.campaigns.isLoadingCreate
  );
  const isSuccessCreate = useSelector(
    (state: RootState) => state.campaigns.isSuccessCreate
  );
  const isErrorCreate = useSelector(
    (state: RootState) => state.campaigns.isErrorCreate
  );
  const errorMessageCreate = useSelector(
    (state: RootState) => state.campaigns.errorMessageCreate
  );

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    totalFund: '',
    expirationDate: new Date(),
    story: '',
    fundraiserName: '',
    patientName: '',
    mediaFiles: [] as { uri: string; name: string; type: string }[],
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const categories = [
    'Medical',
    'Education',
    'Emergency',
    'Community',
    'Sports',
    'Animals',
    'Environment',
    'Other',
  ];

  useEffect(() => {
    if (!user && !isLoadingMe) {
      dispatch(fetchMe());
    }
  }, [user, isLoadingMe]);

  useEffect(() => {
    if (isSuccessCreate) {
      Alert.alert('Success', 'Campaign created successfully!', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
      dispatch(resetCreateStatus());
    }
    if (isErrorCreate) {
      Alert.alert('Error', errorMessageCreate || 'Failed to create');
      dispatch(resetCreateStatus());
    }
  }, [isSuccessCreate, isErrorCreate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('expirationDate', selectedDate);
    }
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Image pick error');
        return;
      }
      const asset = response.assets?.[0];
      if (asset && asset.uri) {
        const file = {
          uri: asset.uri,
          name: asset.fileName || `photo_${Date.now()}.jpg`,
          type: asset.type || 'image/jpeg',
        };
        setFormData(prev => ({
          ...prev,
          mediaFiles: [...prev.mediaFiles, file],
        }));
      }
    });
  };

  const handleSubmit = () => {
    if (!user) return;
    if (!user.isKYC) {
      Alert.alert('KYC Required', 'You must complete KYC before creating a campaign');
      navigation.navigate('KycScreen');
      return;
    }
    // Validate required fields
    if (
      !formData.title ||
      !formData.category ||
      !formData.fundraiserName ||
      !formData.patientName
    ) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const payload = {
      hostID: user._id,
      hostType: 'user' as const,
      totalGoal: Number(formData.totalFund) || 0,
      dateEnd: formData.expirationDate.toISOString(),
      campTypeID: formData.category,
      campName: formData.title,
      campDescription: formData.story,
      mediaFiles: formData.mediaFiles as unknown as File[],
    };
    dispatch(fetchCreateCampaign(payload));

    Alert.alert('Success', 'Campaign created successfully!');
  };

  const handleSaveDraft = () => {
    if(user){
      console.log("userId: ",user._id);
      Alert.alert('Draft Saved', user._id);
    }
    
  };

  if (!user || isLoadingMe) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create a Campaign</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Cover Photo Section */}
        <TouchableOpacity style={styles.coverPhotoContainer} onPress={pickImage}>
          {formData.mediaFiles.length === 0 ? (
            <View style={styles.coverPhotoPlaceholder}>
              <Plus size={32} color="#999" />
              <Text style={styles.coverPhotoText}>Add Cover Photo</Text>
            </View>
          ) : (
            <Image
              source={{ uri: formData.mediaFiles[0].uri }}
              style={styles.coverPhotoPlaceholder}
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>

        {/* Campaign Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Campaign Details</Text>

          {/* Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Title <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your campaign title"
              value={formData.title}
              onChangeText={value => handleInputChange('title', value)}
            />
          </View>

          {/* Category */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Category <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.category}
                style={styles.picker}
                onValueChange={value => handleInputChange('category', value)}>
                <Picker.Item label="Category" value="" />
                {categories.map((category, index) => (
                  <Picker.Item key={index} label={category} value={category} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Total Fund Required */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Total Fund Required</Text>
            <View style={styles.currencyInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.currencyInput}
                placeholder="0"
                value={formData.totalFund}
                onChangeText={value => handleInputChange('totalFund', value)}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Donation Expired Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Donation Expired Date</Text>
            <TouchableOpacity
              style={styles.dateInputContainer}
              onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateText}>
                {formData.expirationDate.toLocaleDateString()}
              </Text>
              <Calendar size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>

          {/* Story */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Story</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Tell us about the story of a campaign"
              value={formData.story}
              onChangeText={value => handleInputChange('story', value)}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Donation Recipient Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Donation Recipient Details</Text>

          {/* Name of Fundraiser */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Name of Fundraiser (People/Organization){' '}
              <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Name of Fundraiser"
              value={formData.fundraiserName}
              onChangeText={value => handleInputChange('fundraiserName', value)}
            />
          </View>

          {/* Name of Patient */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Name of Patient (People/Organization){' '}
              <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Name of Patient"
              value={formData.patientName}
              onChangeText={value => handleInputChange('patientName', value)}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.draftButton}
            onPress={handleSaveDraft}>
            <Save size={16} color="#666" style={{marginRight: 8}} />
            <Text style={styles.draftButtonText}>Draft</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isLoadingCreate}>
            <Send size={16} color="#fff" style={{marginRight: 8}} />
            <Text style={styles.submitButtonText}>{isLoadingCreate ? 'Creating...' : 'Create'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={formData.expirationDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    color: '#333',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  coverPhotoContainer: {
    marginVertical: 20,
  },
  coverPhotoPlaceholder: {
    height: 160,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  coverPhotoText: {
    marginTop: 8,
    color: '#999',
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#ff4444',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  currencyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  currencySymbol: {
    paddingLeft: 12,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  currencyInput: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontSize: 16,
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    height: 120,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
    gap: 12,
  },
  draftButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  draftButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default CreateCampaignScreen;
