import {Image, Text, TouchableOpacity, View} from 'react-native';
import ButtonActive from '../../components/ButtonActive';
import colors from '../Color';
import SelectInStyles from '../Styles/SelectInStyles';

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

const SelectInterest = ({navigation}: any) => {
  return (
    <View style={[SelectInStyles.container]}>
      <View style={SelectInStyles.centerContainer}>
        <Image
          source={require('../../assets/images/img_Success.png')}
          style={SelectInStyles.img}
        />
        <Text style={SelectInStyles.textW}>Welcome to HLU DAN</Text>
        <Text style={SelectInStyles.textM}>
          Thank you for being a part of HLU DAN.
        </Text>
        <Text style={SelectInStyles.textM}>
          Let's make a better world with us.
        </Text>
      </View>
      <View style={SelectInStyles.marginBtn}>
        <ButtonActive
          text="Continue"
          color={colors.white}
          bgColor={colors.primary}
          width="90%"
          radius={50}
          borderColor={colors.primary}
          disabled={false}
        />
      </View>
    </View>
  );
};

export default SelectInterest;
