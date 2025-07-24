import React, {useState} from 'react';
import {
  View,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import {useProfileEditingStyles} from './ProfileEditingStyles';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTheme} from '../../../../utils/ThemeContext';
import {Colors} from '../../../../utils/Colors';
import {Calendar, Search, MapPin} from 'lucide-react-native';
import provinceData from '../DataAddress/province.json';

type Province = {
  code: string;
  name: string;
  nameWithType: string;
  type: string;
};

type Row = {
  label: string;
  value?: string;
  placeholder?: string;
  type?: 'text' | 'date' | 'dropdown' | 'address';
  options?: {label: string; value: string}[];
  editable?: boolean;
  onChangeText?: (text: string) => void;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'phone-pad' | 'email-address' | 'numeric';
  secureTextEntry?: boolean;
};

type UserInfoProps = {
  title?: string;
  subtitle?: string;
  rows: Row[];
};

export const UserInfo: React.FC<UserInfoProps> = ({title, subtitle, rows}) => {
  const styles = useProfileEditingStyles();
  const {theme} = useTheme();
  const color = Colors[theme];
  const [showDatePicker, setShowDatePicker] = useState<number | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressSearchText, setAddressSearchText] = useState('');
  const [selectedAddressRow, setSelectedAddressRow] = useState<number | null>(
    null,
  );

  // Convert province data to array format for easier handling
  const provinceList: Province[] = Object.values(provinceData).map(
    province => ({
      code: province.code,
      name: province.name,
      nameWithType: province.name_with_type,
      type: province.type,
    }),
  );

  // Filter provinces based on search text and sort alphabetically
  const filteredProvinces = provinceList
    .filter(
      province =>
        province.name.toLowerCase().includes(addressSearchText.toLowerCase()) ||
        province.nameWithType
          .toLowerCase()
          .includes(addressSearchText.toLowerCase()),
    )
    .sort((a, b) => a.name.localeCompare(b.name, 'vi'));

  const handleDateChange = (
    event: any,
    selectedDate: any,
    rowIndex: number,
  ) => {
    setShowDatePicker(null);
    if (selectedDate && rows[rowIndex].onChangeText) {
      const formattedDate = selectedDate.toLocaleDateString('vi-VN');
      rows[rowIndex].onChangeText!(formattedDate);
    }
  };

  const handleAddressSelect = (province: Province) => {
    if (selectedAddressRow !== null && rows[selectedAddressRow].onChangeText) {
      rows[selectedAddressRow].onChangeText!(province.nameWithType);
    }
    setShowAddressModal(false);
    setAddressSearchText('');
    setSelectedAddressRow(null);
  };

  const handleAddressPress = (rowIndex: number) => {
    setSelectedAddressRow(rowIndex);
    setShowAddressModal(true);
  };

  const getDateFromString = (dateString: string): Date => {
    if (!dateString) return new Date();

    // Try to parse dd/MM/yyyy format
    if (dateString.includes('/')) {
      const parts = dateString.split('/');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        const parsedDate = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
        );
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
      }
    }

    // Try to parse ISO format (yyyy-MM-dd)
    if (dateString.includes('-')) {
      const parsedDate = new Date(dateString);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }

    // Try to parse as regular date string
    const parsedDate = new Date(dateString);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }

    // Fallback to current date
    return new Date();
  };

  const renderProvinceItem = ({item}: {item: Province}) => (
    <TouchableOpacity
      style={styles.modalOption}
      onPress={() => handleAddressSelect(item)}>
      <Text style={styles.modalOptionText}>{item.nameWithType}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

      {rows.map((row, idx) => (
        <View key={idx} style={styles.row}>
          {(() => {
            const baseText = row.label.replace(/\*/g, '');
            const hasStar = row.label.includes('*');

            return (
              <Text style={styles.label}>
                {baseText}
                {hasStar && <Text style={styles.asterisk}>*</Text>}
              </Text>
            );
          })()}

          {row.type === 'dropdown' ? (
            <View style={[styles.input, styles.dropdownContainer]}>
              <Picker
                selectedValue={row.value}
                enabled={row.editable}
                dropdownIconColor={color.text}
                style={[
                  styles.textSex,
                  {
                    height: Platform.OS === 'ios' ? 40 : 40,
                  },
                ]}>
                <Picker.Item
                  label={row.placeholder || 'Không xác định'}
                  value=""
                />
                {row.options?.map(opt => (
                  <Picker.Item
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                  />
                ))}
              </Picker>
            </View>
          ) : row.type === 'date' ? (
            row.editable ? (
              <TouchableOpacity
                style={[styles.input, styles.dateInputContainer]}
                onPress={() => setShowDatePicker(idx)}>
                <Text style={[styles.txtDate, {color: color.text}]}>
                  {row.value || row.placeholder || 'Chọn ngày'}
                </Text>
                <Calendar size={20} color={color.primary} />
              </TouchableOpacity>
            ) : (
              <View style={[styles.input, {paddingLeft: 16}]}>
                <Text style={styles.txtDate}>
                  {row.value || row.placeholder || 'Chọn ngày'}
                </Text>
              </View>
            )
          ) : row.type === 'address' ? (
            row.editable ? (
              <TouchableOpacity
                style={[styles.input, styles.dateInputContainer]}
                onPress={() => handleAddressPress(idx)}>
                <Text
                  style={[
                    styles.txtDate,
                    {color: row.value ? color.text : color.textSecondary},
                  ]}>
                  {row.value || row.placeholder || 'Chọn tỉnh/thành phố'}
                </Text>
                <MapPin size={20} color={color.primary} />
              </TouchableOpacity>
            ) : (
              <View style={[styles.input, {paddingLeft: 16}]}>
                <Text style={[styles.txtDate, {color: color.text}]}>
                  {row.value || row.placeholder || 'Chưa cập nhật'}
                </Text>
              </View>
            )
          ) : row.editable ? (
            <TextInput
              style={[styles.input, styles.textInput]}
              value={row.value}
              onChangeText={row.onChangeText}
              placeholder={row.placeholder}
              placeholderTextColor={color.textSecondary}
              maxLength={row.maxLength}
              autoCapitalize={row.autoCapitalize}
              keyboardType={row.keyboardType}
              editable={row.editable}
              secureTextEntry={row.secureTextEntry}
            />
          ) : (
            <Text
              style={[
                styles.input,
                styles.textContainer,
                {
                  borderBottomWidth: 0.5,
                  paddingVertical: 8,
                  fontSize: 16,
                  fontWeight: '400',
                },
              ]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {row.value || row.placeholder}
            </Text>
          )}
        </View>
      ))}

      {/* Date Picker Modal */}
      {showDatePicker !== null && (
        <DateTimePicker
          value={getDateFromString(rows[showDatePicker]?.value || '')}
          mode="date"
          display="default"
          onChange={(event, selectedDate) =>
            handleDateChange(event, selectedDate, showDatePicker)
          }
          maximumDate={new Date()}
        />
      )}

      {/* Address Selection Modal */}
      <Modal
        visible={showAddressModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setShowAddressModal(false);
          setAddressSearchText('');
          setSelectedAddressRow(null);
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.addressModalContent}>
            <Text style={styles.modalTitle}>Chọn Tỉnh/Thành phố</Text>

            {/* Search Input */}
            <View style={styles.addressSearchContainer}>
              <Search size={20} color={color.text} />
              <TextInput
                style={styles.addressSearchInput}
                placeholder="Tìm kiếm tỉnh/thành phố..."
                placeholderTextColor={color.textSecondary}
                value={addressSearchText}
                onChangeText={setAddressSearchText}
              />
            </View>

            {/* Results count */}
            <Text
              style={{
                color: color.textSecondary,
                fontSize: 14,
                marginBottom: 8,
                alignSelf: 'flex-start',
              }}>
              {filteredProvinces.length} tỉnh/thành phố
            </Text>

            {/* Province List */}
            <FlatList
              data={filteredProvinces}
              renderItem={renderProvinceItem}
              keyExtractor={item => item.code}
              style={styles.addressListContainer}
              showsVerticalScrollIndicator={true}
              ListEmptyComponent={
                <View style={{padding: 20, alignItems: 'center'}}>
                  <Text style={{color: color.textSecondary, fontSize: 16}}>
                    Không tìm thấy tỉnh/thành phố phù hợp
                  </Text>
                </View>
              }
            />

            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => {
                setShowAddressModal(false);
                setAddressSearchText('');
                setSelectedAddressRow(null);
              }}>
              <Text style={styles.modalCancelText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserInfo;
