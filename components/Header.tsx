import { Image, Text, View } from 'react-native';
import ButtonIcon from './ButtonIcon';
import AppStyles from '@styles/AppStyles';
import { useTheme } from '@utils/ThemeContext';

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

  const { colors } = useTheme();

  return (
    <View style={[AppStyles.rowContainerSpace, { margin: mg }]}>
      <View style={AppStyles.rowContainer}>
        {logo && <Image style={AppStyles.logo} source={logo} />}
        {iconBack && (
          <ButtonIcon
            icon={iconBack}
            bgColor={colors.gray}
            iconColor={colors.text}
            borderRa="50%"
            func={() => {
              navigation.goBack();
            }}
          />
        )}
        {title && (
          <Text style={[AppStyles.textTitle, { color: colors.text }]}>
            {title}
          </Text>
        )}
      </View>
      <View style={AppStyles.rowContainer}>
        {iconSearch && (
          <ButtonIcon
            icon={iconSearch}
            bgColor={colors.lightPrimary}
            iconColor={colors.primary}
            borderRa="10%"
            ml={10}
            func={() => { }}
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
