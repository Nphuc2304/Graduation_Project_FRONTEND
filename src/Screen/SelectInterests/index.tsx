import {Image, Text, TouchableOpacity, View} from 'react-native';
import ButtonActive from '../../../components/ButtonActive';
import colors from '../../Color';
import AppStyles from '../../Styles/AppStyles';
import ButtonIcon from '../../../components/ButtonIcon';
import ThreeCol from '../../../components/ThreeCol';
import {useState} from 'react';
import SelectInStyles from '../../Styles/SelectInStyles';

const Data = [
  'Medical',
  'Disaster',
  'Education',
  'Orphanage',
  'Environment',
  'Disable',
  'Humanity',
  'Social',
  'Other',
];

export const SelectInterest = ({navigation}: any) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectionChange = (items: string[]) => {
    setSelectedItems(items);
  };

  return (
    <View style={[AppStyles.container, SelectInStyles.container]}>
      <View style={[AppStyles.rowContainer, SelectInStyles.title]}>
        <ButtonIcon
          icon={require('../../../assets/icons/back.png')}
          bgColor={colors.gray}
          iconColor={colors.black}
          borderRa="50%"
          styles={{position: 'absolute', left: -10, zIndex: 1}}
          func={() => {
            navigation.goBack();
          }}
        />
        <Text style={AppStyles.textTitle}>Interests</Text>
      </View>
      <Text style={[AppStyles.textNormal, SelectInStyles.textMargin]}>
        Provide your phone number(or)email address for which you want to reset
        your password
      </Text>
      <View style={SelectInStyles.select}>
        <ThreeCol
          data={Data}
          pad={25}
          isMultipleSelect={true}
          onChangeSelected={handleSelectionChange}
        />
      </View>
      <View style={SelectInStyles.marginBtn}>
        <ButtonActive
          text="Continue"
          color={colors.white}
          bgColor={colors.primary}
          width="90%"
          radius={50}
          borderColor={colors.primary}
          func={() => {
            navigation.replace('SelectSuccess');
          }}
          disabled={selectedItems.length === 0}
        />
      </View>
    </View>
  );
};
