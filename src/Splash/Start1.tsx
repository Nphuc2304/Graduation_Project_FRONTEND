import {Image, Text, View} from 'react-native';
import TextLink from '../../components/TextLink';
import ButtonActive from '../../components/ButtonActive';
import colors from '../Color';
import SplashStyles from './SplashStyles/SplashStyles';
import AppStyles from '../Styles/AppStyles';

const Start1 = ({navigation}: any) => {
  return (
    <View style={AppStyles.container}>
      <Image
        style={SplashStyles.img}
        source={require('../../assets/images/img_start_1.png')}
      />
      <Text style={[SplashStyles.textPrimary, SplashStyles.textCenter]}>
        Expand your kindness to the world
      </Text>
      <Text
        style={[SplashStyles.textCenter, AppStyles.textNormal, {width: '90%'}]}>
        Netus nunc nulla a augue augue donec quis. Nibh quam arcu non,cursus
        quis. Mi felis, leo nunc amet viverra orci, netus ornare.
      </Text>
      <Image
        style={SplashStyles.dotGroup}
        source={require('../../assets/icons/dot_group_1.png')}
      />
      <TextLink
        text="Skip"
        color={colors.primary}
        mg={20}
        func={() => {
          navigation.navigate('BottomTabs');
        }}
      />
      <ButtonActive
        text="Next"
        bgColor={colors.primary}
        borderColor={colors.primary}
        color={colors.white}
        width="85%"
        func={() => {
          navigation.navigate('Start2');
        }}
      />
    </View>
  );
};

export default Start1;
