import React from 'react';
import {View, Text, Platform, TextInput} from 'react-native';
import {useProfileEditingStyles} from './ProfileEditingStyles';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '../../../../utils/ThemeContext';
import {Colors} from '../../../../utils/Colors';

type Row = {
  label: string;
  value?: string;
  placeholder?: string;
  type?: 'text' | 'date' | 'dropdown';
  options?: {label: string; value: string}[];
  editable?: boolean;
  onChangeText?: (text: string) => void;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'phone-pad' | 'email-address' | 'numeric';
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
              <TextInput
                style={[styles.input, styles.textInput]}
                value={row.value}
                onChangeText={row.onChangeText}
                placeholder={row.placeholder}
                placeholderTextColor={color.textSecondary}
                maxLength={row.maxLength}
                autoCapitalize={row.autoCapitalize}
                keyboardType={row.keyboardType}
              />
            ) : (
              <View style={[styles.input, {paddingLeft: 16}]}>
                <Text style={styles.txtDate}>
                  {row.value || row.placeholder || 'Chọn ngày'}
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
    </View>
  );
};

export default UserInfo;
