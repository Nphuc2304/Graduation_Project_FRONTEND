import {Image, Text, View} from 'react-native';
import ButtonIcon from './ButtonIcon';
import colors from '../src/Color';
import AppStyles from '../src/Styles/AppStyles';

const Header = (props: any) => {
  const {
    logo,
    title,
    iconSearch,
    iconSave,
    iconBack,
    icon,
    func,
    mg,
    navigation,
  } = props;
  return (
    <View style={[AppStyles.rowContainerSpace, {margin: mg}]}>
      <View style={AppStyles.rowContainer}>
        {logo && <Image style={AppStyles.logo} source={logo} />}
        {iconBack && (
          <ButtonIcon
            icon={iconBack}
            bgColor={colors.gray}
            iconColor={colors.black}
            borderRa="50%"
            func={() => {
              navigation.goBack();
            }}
          />
        )}
        {title && <Text style={AppStyles.textTitle}>{title}</Text>}
      </View>
      <View style={AppStyles.rowContainer}>
        {iconSearch && (
          <ButtonIcon
            icon={iconSearch}
            bgColor={colors.lightPrimary}
            iconColor={colors.primary}
            borderRa="10%"
            ml={10}
            func={() => {}}
          />
        )}
        {iconSave && (
          <ButtonIcon
            icon={iconSave}
            bgColor={colors.lightPrimary}
            iconColor={colors.primary}
            borderRa="10%"
            ml={10}
            func={() => {
              navigation.navigate('Bookmark');
            }}
          />
        )}
        {icon && (
          <ButtonIcon
            icon={icon}
            bgColor={colors.lightPrimary}
            iconColor={colors.primary}
            borderRa="10%"
            ml={10}
            func={func}
          />
        )}
      </View>
    </View>
  );
};

export default Header;
