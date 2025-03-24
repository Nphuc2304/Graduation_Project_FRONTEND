import {Image, TouchableOpacity} from 'react-native';
import AppStyles from '../src/Styles/AppStyles';

const ButtonIcon = (props: any) => {
  const {icon, func, borderRa, bgColor, iconColor} = props;
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderRadius: borderRa,
        backgroundColor: bgColor,
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 1,
      }}
      onPress={func}>
      <Image style={[AppStyles.icon, {tintColor: iconColor}]} source={icon} />
    </TouchableOpacity>
  );
};

export default ButtonIcon;
