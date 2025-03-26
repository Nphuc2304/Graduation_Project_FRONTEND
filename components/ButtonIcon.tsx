import {Image, TouchableOpacity} from 'react-native';
import AppStyles from '../src/Styles/AppStyles';

const ButtonIcon = (props: any) => {
  const {icon, func, borderRa, bgColor, iconColor, styles} = props;
  return (
    <TouchableOpacity
      style={{
        padding: 8,
        borderRadius: borderRa,
        backgroundColor: bgColor,
        ...styles,
      }}
      onPress={func}>
      <Image style={[AppStyles.icon, {tintColor: iconColor}]} source={icon} />
    </TouchableOpacity>
  );
};

export default ButtonIcon;
