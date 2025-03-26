import {Image, Text, View} from 'react-native';
import AppStyles from '../Styles/AppStyles';
import ButtonIcon from '../../components/ButtonIcon';
import colors from '../Color';
import WelcomePageStyles from '../Styles/WelcomePageStyles';
import ButtonActive from '../../components/ButtonActive';

const WelcomePage = ({navigation}: any) => {
  return (
    <View style={AppStyles.container}>
      <ButtonIcon
        icon={require('../../assets/icons/back.png')}
        bgColor={colors.gray}
        iconColor={colors.black}
        borderRa="50%"
        styles={{position: 'absolute', top: 15, left: 15, zIndex: 1}}
        func={() => {
          navigation.goBack();
        }}
      />
      <Image
        style={WelcomePageStyles.logo}
        source={require('../../assets/images/img_splash.png')}
      />
      <Text style={WelcomePageStyles.title}>WHO ARE YOU?</Text>
      <ButtonActive
        text="Donator"
        color={colors.black}
        bgColor={colors.transparent}
        width="85%"
        borderColor={colors.darkGray}
        radius={10}
        img={require('../../assets/icons/donator.png')}
      />
      <View style={{marginTop: 40}}></View>
      <ButtonActive
        text="Fundraiser"
        color={colors.black}
        bgColor={colors.transparent}
        width="85%"
        borderColor={colors.darkGray}
        radius={10}
        img={require('../../assets/icons/Fundraiser.png')}
      />
    </View>
  );
};

export default WelcomePage;
